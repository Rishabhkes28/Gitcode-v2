// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./dev/functions/FunctionsClient.sol";

//import "@chainlink/contracts/src/v0.8/dev/functions/FunctionsClient.sol";
//import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract Project is FunctionsClient {
    using Functions for Functions.Request;

    bytes32 public latestRequestId;
    bytes public latestResponse;
    bytes public latestError;
    event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);

    constructor(address oracle) payable FunctionsClient(oracle) {
        maintainer = msg.sender;
    }

    struct Bounty {
        string description; // Bounty description
        uint256 issueId; // Github Issue number
        uint256 bountyAmount; // Amount of bounty available
        string repo; // Repo
        bool complete; // Bounty is complete or not
        string username;
    }

    Bounty[] public bounties;
    address public maintainer;
    mapping(address => string) public contributorUsernames;
    mapping(address => bool) public contributors;
    mapping(address => bool) public submittedContributors;
    uint256 public bountiesCount;

    modifier restricted() {
        require(msg.sender == maintainer, "Restricted to maintainer");
        _;
    }

    function applyBounty(string memory githubUsername, address walletAddress)
        public
    {
        require(
            contributors[msg.sender] == false,
            "You have already applied to this bounty"
        );
        require(walletAddress != address(0), "Wallet address is required");
        require(
            bytes(githubUsername).length > 0,
            "GitHub username is required"
        );

        contributors[msg.sender] = true;
        contributorUsernames[msg.sender] = githubUsername;
    }

    function createBounty(
        string memory description,
        uint256 issueId,
        uint256 bountyAmount,
        string memory repo,
        string memory username
    ) public payable restricted {
        require(
            msg.value >= bountyAmount,
            "Payment amount must be equal to the bounty amount"
        );

        Bounty memory newBounty = Bounty({
            description: description,
            issueId: issueId,
            bountyAmount: bountyAmount,
            repo: repo,
            username: username,
            complete: false
        });
        bounties.push(newBounty);
        bountiesCount++;
    }

    function executeRequest(
        string calldata source,
        bytes calldata secrets,
        string[] calldata args,
        uint64 subscriptionId,
        uint32 gasLimit
    ) external returns (bytes32) {
        Functions.Request memory req;
        req.initializeRequest(
            Functions.Location.Inline,
            Functions.CodeLanguage.JavaScript,
            source
        );
        if (secrets.length > 0) {
            req.addRemoteSecrets(secrets);
        }
        if (args.length > 0) {
            req.addArgs(args);
        }

        bytes32 assignedReqID = sendRequest(req, subscriptionId, gasLimit);
        latestRequestId = assignedReqID;
        return assignedReqID;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        latestResponse = response;
        latestError = err;
        emit OCRResponse(requestId, response, err);

        if (uint256(bytes32(response)) == 1) {
            getBountiesCount();
        } else {
            revert("No contribution found");
        }
    }

    function getBountiesCount() public view returns (uint256) {
        return bounties.length;
    }
}
