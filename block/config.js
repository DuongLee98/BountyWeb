const projID = "4c069654482c400e8bb5b88e56ab40fd";

const httpProvider = "wss://kovan.infura.io/ws/v3/"+projID;

const addressAccount = '0x42310b551AEDcC7c110548E11d269FF2735cc3A5';
const addressBounty = '0x77133D8f21CDB057fC3dC4213ad2042740AF63D9';

const addressFrom = '0x8Ccad9D8B1283Fd859F6d15C0f648291d340f217';
const privateKey = '0x47C34DDBE8AA3AD2E39BE4C65D02601DDF1165B5FDB5CE7E1B5E3F9D3CC73AE5';

const gasPrice = '50000000000';
const gasLimit = 6000000;

function transaction(ffrom, tto, ddata)
{
	let transactionObject =
	{
		gas: gasLimit,
	    data: ddata,
	    from: ffrom,
	    to: tto
	};
	return transactionObject;
}

function infoTransaction(receipt)
{
	var tx = {};
	tx.status = receipt.status
	tx.transactionHash = receipt.transactionHash
	tx.blockNumber = receipt.blockNumber
	tx.transactionIndex = receipt.transactionIndex

	return tx;
}

function getInfoEvent(event)
{
	info = {};
	info.blockNumber = event.blockNumber;
	info.transactionHash = event.transactionHash;
	info.transactionIndex = event.transactionIndex;
	info.returnValues = event.returnValues;
	info.event = event.event;
	return info;
}

const abiAccount = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "user",
				"type": "string"
			},
			{
				"name": "pass",
				"type": "string"
			}
		],
		"name": "regUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "user",
				"type": "string"
			},
			{
				"name": "pass",
				"type": "string"
			},
			{
				"name": "newPass",
				"type": "string"
			}
		],
		"name": "setPass",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "string"
			},
			{
				"name": "pass",
				"type": "string"
			}
		],
		"name": "login",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "string"
			}
		],
		"name": "existAccount",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "user",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "NewAccount",
		"type": "event"
	}
];

const abiBounty = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "user",
				"type": "string"
			},
			{
				"name": "symbol",
				"type": "string"
			},
			{
				"name": "val",
				"type": "uint256"
			}
		],
		"name": "addBounty",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "b",
				"type": "string"
			}
		],
		"name": "addBountySymbol",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "userA",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "symbolA",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "userB",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "symbolB",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "val",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "NewSend",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "user",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "symbol",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "val",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "NewAdd",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "symbol",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "NewSymbol",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "userA",
				"type": "string"
			},
			{
				"name": "passA",
				"type": "string"
			},
			{
				"name": "symbolA",
				"type": "string"
			},
			{
				"name": "val",
				"type": "uint256"
			},
			{
				"name": "userB",
				"type": "string"
			},
			{
				"name": "symbolB",
				"type": "string"
			}
		],
		"name": "sendBounty",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "b",
				"type": "string"
			}
		],
		"name": "existBountySymbol",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "string"
			},
			{
				"name": "symbol",
				"type": "string"
			}
		],
		"name": "getAllBounty",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "string"
			},
			{
				"name": "symbol",
				"type": "string"
			}
		],
		"name": "getBounty",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getSymbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

module.exports =
{
	projID : projID,
	httpProvider: httpProvider,

	privateKey: privateKey,

	addressAccount: addressAccount,
	addressBounty: addressBounty,
	addressFrom: addressFrom,

	abiBounty: abiBounty,
	abiAccount: abiAccount,

	createTransaction: transaction,
	infoTransaction: infoTransaction,
	getInfoEvent: getInfoEvent
}