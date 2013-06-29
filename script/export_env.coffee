fs = require('fs')
contents = fs.readFileSync('.env', 'utf8')

variables = contents.split('\n')

for v in variables
  command = "export #{v}"
  console.log command