const config = require('./config');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.httpProvider));

var account = new web3.eth.Contract(config.abiAccount, config.addressAccount, {from: config.addressFrom, gasPrice: config.gasPrice});

function regAccount(user, pass) {
	console.log('regAccount');
	return new Promise(function (resolve, reject){
		var builder = account.methods.regUser(user, pass).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressAccount, builder);
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

function setPassAccount(user, pass, newpass) {
	console.log('setPassAccount');
	return new Promise(function (resolve, reject){
		var builder = account.methods.setPass(user, pass, newpass).encodeABI();
		var transaction = config.createTransaction(config.addressFrom, config.addressAccount, builder);
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

function existAccount(user)
{
	return new Promise(function(rs, rj)
	{
		account.methods.existAccount(user).call(function (error, result){
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

function login(user, pass)
{
	return new Promise(function(rs, rj)
	{
		account.methods.login(user, pass).call(function (error, result){
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

function allEventNewAccount()
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
		account.getPastEvents('NewAccount', {
			fromBlock: 0,
			toBlock: 'latest'
		}, function(error, event){
			if (!error)
				return rs(result(event));
			return rj(error);
		})
	})
}

// regAccount("admin2", "protest").then(console.log);
// setPassAccount("admin", "protest", "duonglee147").then(console.log);
// existAccount("admin").then(console.log);
// login("admin", "duonglee147").then(console.log);

module.exports = 
{
	contract: account,

	allEventNewAccount: allEventNewAccount,
	regAccount: regAccount
}