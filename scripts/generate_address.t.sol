// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "forge-std/console.sol";

contract AddressTest is Test {
    function mkaddr(string memory name) public returns (address) {
        address addr = address(
            uint160(uint256(keccak256(abi.encodePacked(name))))
        );
        vm.label(addr, name);
        return addr;
    }

    function testPrint() public {
        console.log(mkaddr("glory"));
        console.log(mkaddr("john"));
        console.log(mkaddr("petter"));
        console.log(mkaddr("paul"));
        console.log(mkaddr("nkecji"));
        console.log(mkaddr("faith"));
        console.log(mkaddr("blessed"));
        console.log(mkaddr("amara"));
        console.log(mkaddr("philip"));
        console.log(mkaddr("vicky"));
    }

}
