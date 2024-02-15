// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./ITreasuryHandler.sol";

contract TreasuryHandler is ITreasuryHandler, Ownable {
    using Address for address payable;

    address payable public treasury;

    event TreasuryAddressUpdated(address oldTreasuryAddress, address newTreasuryAddress);
    event Withdrawal(address tokenAddress, uint256 amount);

    constructor(address _treasury) {
        treasury = payable(_treasury);
    }

    /**
     * @notice Perform operations before a transfer is executed.
     * @param benefactor Address of the benefactor.
     * @param beneficiary Address of the beneficiary.
     * @param amount Number of tokens in the transfer.
     */
    function beforeTransferHandler(
        address benefactor,
        address beneficiary,
        uint256 amount
    ) external {}

    /**
     * @notice Perform operations after a transfer is executed.
     * @param benefactor Address of the benefactor.
     * @param beneficiary Address of the beneficiary.
     * @param amount Number of tokens in the transfer.
     */
    function afterTransferHandler(
        address benefactor,
        address beneficiary,
        uint256 amount
    ) external {}

    function setTreasury(address newTreasuryAddress) external onlyOwner {
        require(
            newTreasuryAddress != address(0),
            "TreasuryHandlerAlpha:setTreasury:ZERO_TREASURY: Cannot set zero address as treasury."
        );

        address oldTreasuryAddress = address(treasury);
        treasury = payable(newTreasuryAddress);

        emit TreasuryAddressUpdated(oldTreasuryAddress, newTreasuryAddress);
    }

    function withdraw(address tokenAddress, uint256 amount) external onlyOwner {
        require(
            tokenAddress != address(0),
            "TreasuryHandler:withdraw:ZERO_ADDRESS: Cannot withdraw zero address."
        );

        if (tokenAddress == address(0)) {
            // Transfer ETH to treasury
            treasury.sendValue(amount);
        } else {
            // Transfer tokens to treasury
            if (
                IERC20(tokenAddress).transfer(address(treasury), amount)
            ) {
                emit Withdrawal(tokenAddress, amount);
            }
        }
    }
}