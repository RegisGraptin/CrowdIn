# Decentralized Crowdfunding

Allow the possibility to requests some funding for a real impact projects.

## Create a campaign 

A user have the possibility to create a campaign.

Set of goals to claims

Milestone mechanism


Campaign owner can define:
- Funding goal.
- Deadline.
- Milestones (description, target funds, and deadlines).
- Contributions: at the moment only native token (see for oracle system later on)


Track the total amount raised.
Milestone-Based Fund Release:

Funds are locked and released based on milestone completion.
Require approval from contributors (e.g., voting or quorum mechanism) for milestone completion.

Refund Mechanism:

If the campaign fails to reach its funding goal by the deadline or fails to meet milestones, contributors can claim refunds.



2. Key Smart Contract Functions
Campaign Management:

createCampaign(goal, deadline, milestones[]): Creates a campaign with defined parameters.
getCampaignDetails(campaignId): View campaign details.

Contributions:

contribute(campaignId): Contribute funds to a specific campaign.
getContributions(campaignId, contributor): View contributions of a user.


Milestone Approval:

proposeMilestoneCompletion(campaignId, milestoneId): Campaign owner proposes milestone completion.
voteForMilestone(campaignId, milestoneId, approve): Contributors vote to approve or reject a milestone.
releaseFunds(campaignId, milestoneId): Releases funds if the milestone is approved.


Refunds:

requestRefund(campaignId): Contributor requests refund if campaign fails.
Fallback:

receive() external payable: Handle unexpected funds sent to the contract.
3. Data Structures
solidity
Copy code
struct Milestone {
    string description;
    uint256 targetFunds;
    uint256 deadline;
    bool completed;
}

struct Campaign {
    address owner;
    uint256 goal;
    uint256 deadline;
    uint256 fundsRaised;
    Milestone[] milestones;
    mapping(address => uint256) contributions;
    bool isSuccessful;
    bool isRefunded;
}


4. Logic



Campaign Validation:

Ensure goal and deadline are valid during creation.
Prevent further contributions after the deadline or goal completion.


Milestone Voting:

Use a simple majority or a quorum percentage for approvals.
Track votes per contributor.


Fund Management:

Only allow the owner to propose milestone completions.
Allow partial fund release corresponding to milestone targets.


5. Security Considerations
Protect against reentrancy attacks using the Checks-Effects-Interactions pattern.
Validate milestone approvals to prevent tampering.
Ensure only the campaign owner can manage funds and propose milestones.


6. Advanced Features (Optional)
Token Support: Allow funding with ERC20 tokens.
Escrow Contract: Use an external escrow for fund locking and releasing.
Milestone Audits: Integrate third-party auditors for milestone verification.
