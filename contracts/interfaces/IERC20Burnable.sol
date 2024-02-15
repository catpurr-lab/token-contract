// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC20Burnable {
    /**
     * @notice Destroys `amount` tokens from the caller.
     * @param amount Number of tokens to burn.
     */
    function burn(uint256 amount) external;

    /**
     * @notice Destroys `amount` tokens from `account`, deducting from the caller's allowance.
     * @param account Address of the account that will have tokens burned.
     * @param amount Number of tokens to burn.
     */
    function burnFrom(address account, uint256 amount) external;
}
