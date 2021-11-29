export const citiesAbi = [
    {
        'inputs': [
            {
                'internalType': 'uint256',
                'name': 'tileLocator',
                'type': 'uint256'
            }
        ],
        'name': 'buyTile',
        'outputs': [],
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'inputs': [],
        'stateMutability': 'payable',
        'type': 'constructor'
    },
    {
        'inputs': [],
        'name': 'city',
        'outputs': [
            {
                'internalType': 'uint256',
                'name': 'area',
                'type': 'uint256'
            },
            {
                'internalType': 'uint256',
                'name': 'citizens',
                'type': 'uint256'
            },
            {
                'internalType': 'string',
                'name': 'name',
                'type': 'string'
            }
        ],
        'stateMutability': 'view',
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
