var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.redirect('/login');
});

router.get('/u/',async function(req, res, next) {
	var data = res.locals;
	return res.redirect('/login');
});

router.get('/u/:user',async function(req, res, next) {
	var data = res.locals;
	if (res.locals.login != true)
	{
		return res.redirect('/login');
	}
	data.ouser = req.params.user;
	res.render('user', data);
});

router.get('/transaction',async function(req, res, next) {
	var data = res.locals;
	if (res.locals.login != true)
	{
		return res.redirect('/login');
	}

	res.render('transaction', data);
});

router.get('/transactionhistory/',async function(req, res, next) {
	var data = res.locals;
	if (res.locals.login != true)
	{
		return res.redirect('/login');
	}
	data.ouser = data.user;
	res.render('transactionhistory', data);
});

router.get('/transactionhistory/:user',async function(req, res, next) {
	var data = res.locals;
	if (res.locals.login != true)
	{
		return res.redirect('/login');
	}
	data.ouser = req.params.user;
	res.render('transactionhistory', data);
});

module.exports = router;
