homeController = require('./controllers/home_controller')

passport = require('passport')
flash = require('connect-flash')
  
exports.draw = (app) ->

  app.get '/', homeController.index

  app.get  '/login', (req, res) -> 
    res.render 'login',
      hidenav: true 
      user: req.user, 
      flashErrors: req.flash('error')[0]
      tab: 'login'
  
  app.post '/login', passport.authenticate('local', 
    failureFlash: true
    successRedirect: '/'
    failureRedirect: '/login')

  app.get '/logout', (req, res) ->
    req.logout()
    res.redirect('/')