pragma solidity ^0.5.8;

contract Marketplace {

   uint public productCount=0;

   struct Product {
       uint id;
       uint price;
       address payable owner;
       string name;
       string description;
       bool isBought;
   }

   mapping(uint => Product) public products;

   event ProductAdd(
       uint id,
       uint price,
       address payable owner,
       string name,
       string description,
       bool isBought
   );
   event BuyProduct(
       uint id,
       address payable owner,
       bool isBought
    );

   constructor() public {

   }

   function productAdd(uint _price, string memory _name, string memory _description) public {
       require(_price>0);
       require(bytes(_name).length>0);
       require(bytes(_description).length>0);
       products[productCount] = Product(productCount, _price, msg.sender, _name, _description, false);
       emit ProductAdd(productCount, _price, msg.sender, _name, _description, false);
       productCount++;
   }

   function buyProduct(uint _id) public payable {
       require(!products[_id].isBought);
       require(products[_id].owner != msg.sender);
       require(_id>=0 && _id<=productCount);
       require(msg.value>=products[_id].price*1000000000000000000);
       products[_id].owner.transfer(msg.value);
       products[_id].owner = msg.sender;
       products[_id].isBought = true;
       emit BuyProduct(_id, msg.sender, true);
   }
}
