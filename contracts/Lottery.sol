pragma solidity ^0.4.17;

contract Lottery {
    address public owner;
    address[] public players;
    address[] public inactivePlayers;
    uint public elapsedTime;
    uint public number = 0;
    string public description = "This is the lottery where you will most likely to lose all the money. Sorry about that";
    bool public isActive = true;

    function Lottery() public {
        owner = msg.sender;
        elapsedTime = now + 604800;
    }

    function enter() public payable {
        if (msg.value >= .02 ether && now < elapsedTime && number <= 10 && isActive == true) {
            players.push(msg.sender);
            number++;
        } else {
            inactivePlayers.push(msg.sender);
        }
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        owner.transfer(this.balance / 2);
        players[index].transfer(this.balance);
        players = new address[](0);
        inactivePlayers = new address[](0);
        isActive = false;
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    function getInactivePlayers() public view returns (address[]) {
        return inactivePlayers;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }

    function getTimeLeft() public view returns (uint){
        uint timeLeft = elapsedTime - now;
        return timeLeft;
    }
}