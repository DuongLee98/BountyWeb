const config = require('./config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.httpProvider));

var bounty = new web3.eth.Contract(config.abiBounty, config.addressBounty, {from: config.addressFrom, gasPrice: config.gasPrice});

function addBountySymbol(b) {
	console.log('addBountySymbol');
	return new Promise(function (resolve, reject){
		var builder = bounty.methods.addBountySymbol(b).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressBounty, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject(err);
		 		})
			}
		});
	})
}

function addBounty(user, symbol, val) {
	console.log('addBounty');
	return new Promise(function (resolve, reject){
		var builder = bounty.methods.addBounty(user, symbol, val).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressBounty, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject(err);
		 		})
			}
		});
	})
}

function sendBounty(userA, passA, symbolA, val, userB, symbolB) {
	console.log('sendBounty');
	return new Promise(function (resolve, reject){
		var builder = bounty.methods.sendBounty(userA, passA, symbolA, val, userB, symbolB).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressBounty, builder);
		web3.eth.accounts.signTransaction(transaction, config.privateKey, function (error, signedTx) {
		    if (error)
		    {
		        return reject(error);
			}
			else
			{
				web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
		            return resolve(receipt);
		 		}).on('error', function(err){
		 			return reject(err);
		 		})
			}
		});
	})
}

function getAllBounty(user, symbol)
{
	return new Promise(function(rs, rj)
	{
		bounty.methods.getAllBounty(user, symbol).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getBounty(user, symbol)
{
	return new Promise(function(rs, rj)
	{
		bounty.methods.getBounty(user, symbol).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function getSymbol(i)
{
	return new Promise(function(rs, rj)
	{
		bounty.methods.getSymbol(i).call(function (error, result){
			if (error)
			{
				return rj(error);
			}
			else
			{
				return rs(result);
			}
		});
	})
}

function allEventNewAdd()
{
	function result(events)
	{
		arr = [];
		for (var i=0; i<events.length; i++)
		{
			info = config.getInfoEvent(events[i]);
			arr.push(info);
		}
		return arr;
	}
	return new Promise(function(rs, rj)
	{
		bounty.getPastEvents('NewAdd', {
			fromBlock: 0,
			toBlock: 'latest'
		}, function(error, event){
			if (!error)
				return rs(result(event));
			return rj(error);
		})
	})
}

function allEventNewSend()
{
	function result(events)
	{
		arr = [];
		for (var i=0; i<events.length; i++)
		{
			info = config.getInfoEvent(events[i]);
			arr.push(info);
		}
		return arr;
	}
	return new Promise(function(rs, rj)
	{
		bounty.getPastEvents('NewSend', {
			fromBlock: 0,
			toBlock: 'latest'
		}, function(error, event){
			if (!error)
				return rs(result(event));
			return rj(error);
		})
	})
}


// addBountySymbol("DLC").then(console.log);
// addBounty("admin", "DLC", 50)
// getAllBounty("admin2", "DLC").then(console.log);
// getBounty("admin", "DLC").then(console.log);
// getSymbol(0).then(console.log);
// sendBounty("admin", "duonglee147", "DLC", 25, "admin2", "DLC").then(console.log);
// listenNewAdd().then(console.log);

module.exports = 
{
	contract: bounty,

	allEventNewAddBounty: allEventNewAdd,
	allEventNewSend: allEventNewSend,
	addBounty: addBounty
}