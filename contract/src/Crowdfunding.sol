// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Campaign} from "./Campaign.sol";

contract Crowdfunding {
    address[] public campaigns;

    event CampaignCreated(address campaignAddress, address owner, uint256 targetDonation, uint256 targetDate);

    constructor() {}

    function createCampaign(
        address _owner,
        uint256 _targetDate,
        uint256 _targetDonation,
        string memory _title,
        string memory _description,
        Campaign.Milestone[] memory _milestones
    ) public {
        Campaign campaign = new Campaign(
            _owner,
            _targetDate,
            _targetDonation,
            _title,
            _description,
            _milestones
        );
        campaigns.push(address(campaign));
        
        emit CampaignCreated(address(campaign), _owner, _targetDonation, _targetDate);
    }
}
