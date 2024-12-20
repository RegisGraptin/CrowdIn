// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {

    struct Milestone {
        uint256 date;
        uint256 amount;
        string description;
    }

    struct Campaign {
        string title;
        string description;
        uint256 targetDate;
        uint256 targetDonation;
        address owner;
    }

    uint256 public campaignId;
    mapping (uint256 id => Campaign) public campaigns;
    mapping (uint256 id => mapping(address => uint256)) public contributions;
    mapping (uint256 id => Milestone[]) public milestones;

    event CampaignCreated(uint256 campaignId, address owner, uint256 targetDonation, uint256 targetDate);
    event DonationReceived(address donor, uint256 amount);

    constructor() {}

    function createCampaign(
        uint256 _targetDate,
        uint256 _targetDonation,
        string memory _title,
        string memory _description,
        Milestone[] memory _milestones
    ) public {
        
        campaigns[campaignId] = Campaign({
            title: _title,
            description: _description,
            targetDate: _targetDate,
            targetDonation: _targetDonation,
            owner: msg.sender
        });
        
        // Copy the milestone
        for (uint i = 0; i < _milestones.length; i++) {
            milestones[campaignId].push(Milestone({
                date: _milestones[i].date,
                amount: _milestones[i].amount,
                description: _milestones[i].description
            }));
        }
    
        emit CampaignCreated(campaignId, msg.sender, _targetDonation, _targetDate);

        campaignId++;
    }

    // Accept dontion with native token
    function donation(uint256 id) external payable {
        require(id < campaignId, "Must be an existing campaign");
        require(msg.value > 0, "Must send native token");
        
        require(block.timestamp < campaigns[id].targetDate, "Campaign ended");

        // Add the contribution from the user        
        contributions[id][msg.sender] += msg.value;

        emit DonationReceived(msg.sender, msg.value);
    }
}
