export const citiesAbi = [
    {
        'inputs': [],
        'stateMutability': 'payable',
        'type': 'constructor'
    },
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': 'tileLocator',
                'type': 'uint256'
            },
            {
                'internalType': 'address payable',
                'name': 'upAddress',
                'type': 'address'
            }
        ],
        'name': 'buyTile',
        'outputs': [],
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': '',
                'type': 'uint256'
            }
        ],
        'name': 'tiles',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'locator',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': 'currentPrice',
                'type': 'uint256'
            },
            {
                'internalType': 'address payable',
                'name': 'owner',
                'type': 'address'
            }
        ],
        'stateMutability': 'view',
        'type': 'function'
    }
]