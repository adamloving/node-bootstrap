This is a starter project for node that looks a lot like Rails.

Installation
============

    git clone git@github.com:adamloving/node-bootstrap.git

    npm install

create .env file with these variables set

    ...

Startup
=======

    foreman start web

or 

    script/start.sh

which will export the variables in .env and then run

    nodemon app.coffee

Heroku Setup
============

Memcache (this automatically adds config environment variables)

    heroku addons:add memcachier:dev

Set env vars

    script/export_env_heroku.coffee

warning: this sets NODE_ENV!
