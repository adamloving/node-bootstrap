mysql   = require('mysql')
jQuery  = require('jquery-deferred')

class exports.SqlModel

  @getConnection: (debugging) ->
    connectionSettings = 
      host: process.env.MYSQL_HOST || '127.0.0.1'
      database: process.env.MYSQL_DATABASE || 'node_bootstrap_dev'
      user: process.env.MYSQL_USER || 'root'
      password: process.env.MYSQL_PASSWORD || ''

    console.log 'Connecting to MySQL', connectionSettings if debugging

    connection = mysql.createConnection(connectionSettings)
    connection.connect()
    connection

  @execQuery: (sql, debugging) ->
    startTime = new Date()
    if debugging
      console.log '==== Query ===='
      console.log sql
      console.log '==============='

    d = jQuery.Deferred()
    conn = @getConnection()
    
    conn.query sql, (err, rows, fields) ->
      throw err if (err) # console.log('Results: ', rows)
      d.resolve (rows)
      console.log '=== ELAPSED ===', new Date() - startTime
    
    d.done ->
      conn.end()
    d

  getConnection: ->
    exports.SqlModel.getConnection(@debugging)

  execQuery: (sql) ->
    exports.SqlModel.execQuery(sql, @debugging)
