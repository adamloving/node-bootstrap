fs = require('fs')
contents = fs.readFileSync('.env', 'utf8')
exec = require('execSync').exec

variables = contents.split('\n')

for v in variables
  command = "heroku config:set #{v}"
  console.log command
  result = exec(command)
  console.log result.stdout
