// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
interface IERC20 {

    function transfer(address _to, uint256 _amount) external returns (bool);
     function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) external;
    function approve(address _spender, uint256 _amount) external;
    function withdrawFromContract(address _to, uint _amount) external;

}