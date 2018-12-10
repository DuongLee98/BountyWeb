var express = require('express');
var router = express.Router();
var account = require('../block/account');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/', async function(req, res, next) {
	let data = {};
	data.user = req.body.user;
	data.pass = req.body.pass;

	try
	{
		
		var info = await account.login(data.user, data.pass);
		if(info == true)
		{
			req.session.login = true;
			req.session.pass = data.pass;
			req.session.user = data.user;
			return res.redirect('/users/u/'+data.user);
		}
		else
		{
			res.render('login');
		}
	}
	catch(e)
	{
		res.send(e);
	}
	
});
module.exports = router;
