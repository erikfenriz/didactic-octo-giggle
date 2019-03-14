pragma solidity >=0.4.22 <0.6.0;

contract Lottery {
    address payable private owner;
    address payable[] private players;
    address[] private inactivePlayers;
    uint private elapsedTime;
    uint private number = 0;
    string public description = "This is the lottery where you will most likely to lose all the money. Sorry about that";
    bool public isActive = true;

    constructor() public {
        owner = msg.sender;
        elapsedTime = now + 604800;
    }

    function enter() public payable {
        if(msg.value >= .02 ether && now < elapsedTime && number <= 10 && isActive == true){
            players.push(msg.sender);
            number++;
        } else {
            inactivePlayers.push(msg.sender);
        }
    }

    function pickWinner() public payable restricted {
        uint index = random() % players.length;
        owner.transfer(address(this).balance / 2);
        players[index].transfer(address(this).balance);

        players = new address payable[](0);
        inactivePlayers = new address[](0);
        isActive = false;
    }

    modifier restricted(){
        require(msg.sender == owner);
        _;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getInactivePlayers() public view returns (address[] memory) {
        return inactivePlayers;
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }

    function getNumber() public view returns (uint256){
        return number;
    }

    function getTimeLeft() public view returns(uint){
        uint timeLeft = elapsedTime - now;
        return timeLeft;
    }
}