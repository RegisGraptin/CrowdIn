// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Campaign {
    address public owner;
    IERC20 public donationToken;
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalDonations;

    mapping(address => uint256) public contributions;

    constructor(address _owner, IERC20 _token, uint256 _goal, uint256 _duration) {
        owner = _owner;
        donationToken = _token;
        goal = _goal;
        deadline = block.timestamp + _duration;
    }

    // Accept donations
    function donate(uint256 _amount) external {
        require(block.timestamp < deadline, "Campaign ended");
        require(_amount > 0, "Invalid amount");

        // Transfer ERC20 tokens from contributor to this contract
        donationToken.transferFrom(msg.sender, address(this), _amount);
        contributions[msg.sender] += _amount;
        totalDonations += _amount;
    }

    // Withdraw funds if the goal is reached
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(totalDonations >= goal, "Goal not reached");

        donationToken.transfer(owner, totalDonations);
    }

    // Refund contributors if the campaign fails
    function refund() external {
        require(block.timestamp >= deadline, "Campaign still active");
        require(totalDonations < goal, "Goal reached");

        uint256 amount = contributions[msg.sender];
        require(amount > 0, "No contributions");

        contributions[msg.sender] = 0;
        donationToken.transfer(msg.sender, amount);
    }

    // View contribution
    function getContribution(address _contributor) external view returns (uint256) {
        return contributions[_contributor];
    }
}
