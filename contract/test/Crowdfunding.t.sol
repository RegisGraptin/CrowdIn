// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";

import {Crowdfunding} from "../src/Crowdfunding.sol";

contract CrowdfundingTest is Test {

    Crowdfunding crowdfunding;

    function setUp() public {
        crowdfunding = new Crowdfunding();
    }

    function test_createNewProject() public {
        assertEq(crowdfunding.campaignId(), 0);
        
        Crowdfunding.Milestone[] memory _milestones = new Crowdfunding.Milestone[](1);
        _milestones[0] = Crowdfunding.Milestone({
            date: 1574845758,
            amount: 100,
            description: "Final release"
        });

        crowdfunding.createCampaign(
            1574845758, 
            100, 
            "This is a test", 
            "this is a description", 
            _milestones
        );

        assertEq(crowdfunding.campaignId(), 1);

        Crowdfunding.Milestone[] memory milestones = crowdfunding.getMilestones(0);
        assertEq(milestones.length, 1);
        assertEq(milestones[0].date, 1574845758);
    }
}