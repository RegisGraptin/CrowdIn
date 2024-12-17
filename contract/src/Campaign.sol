// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Campaign is ERC20 {

    struct Milestone {
        uint256 date;
        string description;
    }

    string public title;
    string public description;
    Milestone[] public milestones;

    uint256 public targetDate;
    uint256 public targetDonation;

    address public owner;



    event DonationReceived(address donor, uint256 amount);

    constructor(
        address _owner,
        uint256 _targetDate,
        uint256 _targetDonation,
        string memory _title,
        string memory _description,
        Milestone[] memory _milestones
    ) ERC20("Campaign#1", "CMP") {
        owner = _owner;
        targetDate = _targetDate;
        targetDonation = _targetDonation;
        title = _title;
        description = _description;

        for (uint256 i = 0; i < _milestones.length; i++) {
            milestones.push(
                Milestone({
                    date: _milestones[i].date,
                    description: _milestones[i].description
                })
            );
        }   
    }

    // Accept dontion with native token
    receive() external payable {
        require(block.timestamp < targetDate, "Campaign ended");
        require(msg.value > 0, "Must send native token");

        // Mint corresponding token
        _mint(msg.sender, msg.value);

        emit DonationReceived(msg.sender, msg.value);
    }

}
