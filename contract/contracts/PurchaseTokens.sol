// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

 import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ShahidToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("ShahidToken", "ST") {
        _mint(msg.sender, initialSupply);
    }
}
//0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8

contract TokenPurchaseContract {
    ShahidToken public token; // Your ERC-20 token contract
    address public owner;
    uint256 public tokenPrice; // Price per token in wei (0.002 ETH = 2000000000000000 wei)

    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);

    constructor(address _tokenAddress, uint256 _priceInWei) {
        token = ShahidToken(_tokenAddress); // Initialize the ERC-20 token contract
        owner = msg.sender; // Set the owner of the contract
        tokenPrice = _priceInWei;
    }

    function purchaseTokens(uint256 numberOfTokens) public payable {
        uint256 cost = numberOfTokens * tokenPrice;
        require(msg.value >= cost, "Insufficient Ether sent");

        uint256 tokensAvailable = token.balanceOf(address(this));
        require(tokensAvailable >= numberOfTokens, "Not enough tokens available");

        token.transfer(msg.sender, numberOfTokens);
        emit TokensPurchased(msg.sender, numberOfTokens, cost);

        // Refund any excess Ether sent by the user
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
    }
    function withdraw() external {
    require(msg.sender == owner, "You must be the owner to withdraw");
    payable(owner).transfer(address(this).balance);
}


}
