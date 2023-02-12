const erc20_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "landlord",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "lessee",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "server",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "landlord_special",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lessee_special",
						"type": "string"
					},
					{
						"internalType": "enum AnBangToken.vote_Status",
						"name": "landlord_vote",
						"type": "uint8"
					},
					{
						"internalType": "enum AnBangToken.vote_Status",
						"name": "lessee_vote",
						"type": "uint8"
					},
					{
						"internalType": "enum AnBangToken.vote_Status",
						"name": "server_vote",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "vote",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "vote_OK_num",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "vote_Wait_num",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "enum AnBangToken.contract_type",
								"name": "form",
								"type": "uint8"
							},
							{
								"internalType": "uint256",
								"name": "deposit",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "maintenance",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "building_status",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "nft_address",
								"type": "address"
							}
						],
						"internalType": "struct AnBangToken.building_info",
						"name": "building",
						"type": "tuple"
					}
				],
				"indexed": false,
				"internalType": "struct AnBangToken.contractProposal",
				"name": "_proposal",
				"type": "tuple"
			}
		],
		"name": "voteComplete",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "landlord_special",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "lessee_special",
				"type": "string"
			}
		],
		"name": "writeSpecialContract",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "contractMapping",
		"outputs": [
			{
				"internalType": "address",
				"name": "landlord",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "lessee",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "server",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "landlord_special",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lessee_special",
				"type": "string"
			},
			{
				"internalType": "enum AnBangToken.vote_Status",
				"name": "landlord_vote",
				"type": "uint8"
			},
			{
				"internalType": "enum AnBangToken.vote_Status",
				"name": "lessee_vote",
				"type": "uint8"
			},
			{
				"internalType": "enum AnBangToken.vote_Status",
				"name": "server_vote",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "vote",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "vote_OK_num",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vote_Wait_num",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "enum AnBangToken.contract_type",
						"name": "form",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "deposit",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maintenance",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "building_status",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "nft_address",
						"type": "address"
					}
				],
				"internalType": "struct AnBangToken.building_info",
				"name": "building",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getProposal",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "landlord",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "lessee",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "server",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "landlord_special",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lessee_special",
						"type": "string"
					},
					{
						"internalType": "enum AnBangToken.vote_Status",
						"name": "landlord_vote",
						"type": "uint8"
					},
					{
						"internalType": "enum AnBangToken.vote_Status",
						"name": "lessee_vote",
						"type": "uint8"
					},
					{
						"internalType": "enum AnBangToken.vote_Status",
						"name": "server_vote",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "vote",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "vote_OK_num",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "vote_Wait_num",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "enum AnBangToken.contract_type",
								"name": "form",
								"type": "uint8"
							},
							{
								"internalType": "uint256",
								"name": "deposit",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "maintenance",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "building_status",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "tokenId",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "nft_address",
								"type": "address"
							}
						],
						"internalType": "struct AnBangToken.building_info",
						"name": "building",
						"type": "tuple"
					}
				],
				"internalType": "struct AnBangToken.contractProposal",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "landlord",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "lessee",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "landlord_special",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lessee_special",
				"type": "string"
			},
			{
				"internalType": "enum AnBangToken.contract_type",
				"name": "form",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "deposit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maintenance",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "building_status",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "nft_address",
				"type": "address"
			}
		],
		"name": "proposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "enum AnBangToken.vote_Status",
				"name": "voting",
				"type": "uint8"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const erc20_contractAddress = '0xF07eefb41e0d1e95E74DcA270f33e9828504C961'

module.exports = {erc20_ABI, erc20_contractAddress };