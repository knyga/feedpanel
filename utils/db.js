const orm = require("orm");
const config = require('../consts/config.js');
let db = null;

module.exports = async function() {
  if(!db) {
    const {user, host, database, password, port} = config.db;
    db = await orm.connectAsync(`mysql://${user}:${password}@${host}:${port}/${database}`);
  }

  return db;
};