// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./ITaxHandler.sol";

/**
 * @title Exponential tax handler
 * @dev This tax handler applies an exponential tax to token transfers.
 */
contract ExponentialTaxHandler is ITaxHandler, Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    // Benefactors that are exempt from taxes
    EnumerableSet.AddressSet private _exempted;

    // Tax rate
    uint256 private _taxRate;

    /// @notice Emitted when an address is added to or removed from the exempted addresses set.
    event TaxExemptionUpdated(address indexed wallet, bool exempted);

    /**
     * @notice Set tax rate and base
     */
    constructor() {
        _taxRate = 500; // 5% tax
    }

    function setTaxRate(uint256 taxRate) external onlyOwner {
        require(taxRate <= 2500, "ExponentialTaxHandler:setTaxRate:INVALID_TAX_RATE"); // Tax rate must be between 0% and 25%

        _taxRate = taxRate;
    }

    function getTaxRate() external view returns (uint256) {
        return _taxRate;
    }

    function addExempt(address exemption) external onlyOwner {
        if (_exempted.add(exemption)) {
            emit TaxExemptionUpdated(exemption, true);
        }
    }

    function removeExempt(address exemption) external onlyOwner {
        if (_exempted.remove(exemption)) {
            emit TaxExemptionUpdated(exemption, false);
        }
    }

    function isExempt(address exemption) external view returns (bool) {
        return _exempted.contains(exemption);
    }

    function getTax(
        address benefactor,
        address beneficiary,
        uint256 amount
    ) external view override returns (uint256) {
        if (_exempted.contains(benefactor) || _exempted.contains(beneficiary)) {
            return 0;
        }

        // Tax is calculated as a percentage of the amount, with a precision of 3 decimal places
        // so 1% is represented as 100
        return (amount * _taxRate) / 10000;
    }
}