pragma solidity >=0.7.0 <0.9.0;

//Default value wei
contract Fund {
    string fundName;
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    uint public numRequests;
    mapping(uint => Request) public requests;

    address public manager;

    mapping(address => bool) public donators;
    uint public donatorsCount;

    modifier restricted() {
        require(msg.sender == manager, "Only Owner can create request!");
        _;
    }

    constructor(string memory name, address creator)  {
        manager = creator;
        fundName = name;

    }

    function contribute() public payable {
        require(msg.value > 0, "No value sent!");

        //multiple donation from same donator only count once, value automatically added
        if (!donators[msg.sender]) {
            donators[msg.sender] = true;
            donatorsCount++;
        }
//        donators[msg.sender] = true;
//        donatorsCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        require(value <= address(this).balance, "Not enough money left!");
        Request storage r = requests[numRequests];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalCount = 0;
        numRequests++;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(donators[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;

        finalizeRequest(index);
    }

    function finalizeRequest(uint index) internal {
        Request storage request = requests[index];

        if (request.approvalCount >= (donatorsCount / 2) && !request.complete) {
            request.recipient.transfer(request.value);
            request.complete = true;
        }
    }

    function getSummary() public view returns(
        string memory, uint, uint, uint, address
    ) {
        return (
        fundName,
        address(this).balance,
        numRequests,
        donatorsCount,
        manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return numRequests;
    }
}
