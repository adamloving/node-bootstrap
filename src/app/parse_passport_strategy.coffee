Kaiseki = require('kaiseki')
LocalStrategy = require('passport-local').Strategy

exports.getStrategy = (passport) ->

  passport.serializeUser (user, done) -> 
    done(null, JSON.stringify(user))

  passport.deserializeUser (serializedUser, done) -> 
    console.log "deserializeUser", JSON.parse(serializedUser)
    done(null, JSON.parse(serializedUser))

  strategy = new LocalStrategy (username, password, done) -> 
    console.log "Authenticate", username
    
    kaiseki = new Kaiseki(process.env.PARSE_APP_ID, process.env.PARSE_REST_KEY)
    
    kaiseki.loginUser username, password, (err, res, body, success) ->
      console.log('user logged in?', typeof(body), body)
      body.password = password
      if err
        done(err)
      else if body.error
        done(null, false, message: body.error)
      else
        done(null, body)

  strategy
