express = require('express')
MemcachedStore = require('connect-memcached')(express)
fs = require('fs')
net = require('net')
memjs = require('memjs')
routes = require('./src/app/routes')
path = require('path')
http = require('http')
exec  = require('child_process').exec
passport = require('passport')
strategy = require('./src/app/parse_passport_strategy')
flash = require('connect-flash')
require('./validate_env')

app = express()

app.set('port', process.env.PORT || 3010)
app.set('views', __dirname + '/src/app/views')

console.log __dirname + '/src/app/views'

app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.static(path.join(__dirname, '/build')))
app.use(express.logger('dev'))
app.use(express.cookieParser('changeme'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.session(secret: 'changeme', store: new MemcachedStore))
app.use(require('stylus').middleware(__dirname + '/build'))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(app.router)

passport.use strategy.getStrategy(passport)

# development only
if 'development' == app.get('env')
  app.use(express.errorHandler())

app.all '*', (req, res, next) ->
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()

routes.draw(app)

process.env.PORT = process.env.PORT || 3000
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

console.log 'Waiting for memcache...'
cache = memjs.Client.create()
cache.get 'test', (err, json) =>  
  console.log 'Yes, memcache is running!'
  server = http.createServer(app).listen(process.env.PORT, ->
    exec("chown www-data:www-data #{process.env.PORT}"))
  console.log "Listening on port #{process.env.PORT}"
  console.log "Environment is #{process.env.NODE_ENV}"