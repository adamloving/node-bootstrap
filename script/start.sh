coffee script/export_env.coffee > env.sh
source env.sh
nodemon app.coffee
rm env.sh