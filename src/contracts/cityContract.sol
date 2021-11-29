pragma solidity ^0.8.10;

contract CityContract {
    struct Tile {
        uint256 locator;
        uint256 currentPrice;
        address payable owner;
        address upAddress;
    }
    struct City {
        uint256 area;
        uint256 citizens;
        string name;
    }
    address payable gameMaster;
    City public city;
    Tile[70] public tiles;

    constructor(
        uint256 sqm,
        uint256 citizens,
        string memory name
    ) public payable {
        gameMaster = payable(msg.sender);
        city.name = name;
        uint256 minimalPrice = citizens * sqm * 100000;
        fillTilesWithGameMaster(sqm, citizens, minimalPrice);
    }

    function buyTile(uint256 tileLocator, address payable upAddress)
        public
        payable
    {
        Tile memory tile = tiles[tileLocator];
        require(tile.currentPrice > 0, "tile does not exists");
        uint256 price = tile.currentPrice * 2;
        require(msg.sender != tile.owner, "you cannot buy your own tile");
        require(
            msg.value > price - 1,
            "you must pay double the price of the tile to get it"
        );
        require(
            upAddress != tile.upAddress,
            "you cannot buy tile with the same profile"
        );
        tile.owner.transfer(msg.value);
        tiles[tileLocator].owner = payable(msg.sender);
        tiles[tileLocator].currentPrice = price;
        tiles[tileLocator].upAddress = upAddress;
    }

    function fillTilesWithGameMaster(
        uint256 sqm,
        uint256 citizens,
        uint256 minimalPrice
    ) private {
        require(msg.sender == gameMaster);

        require(minimalPrice > 0, "minimal price must be greater than 0");

        for (uint256 i = 0; i < sqm; i++) {
            tiles[i] = Tile(
                i,
                minimalPrice,
                payable(msg.sender),
                payable(msg.sender)
            );
        }

        require(tiles.length > 0, "city tiles does not exists");
        city.citizens = citizens;
        city.area = sqm;
    }
}
