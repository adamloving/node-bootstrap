passport = require('passport')

exports.index = (req, res) ->
  res.redirect('/login') unless req.user
  res.render('home', { tab: 'home', user: req.user })