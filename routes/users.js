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

module.exports = router;
