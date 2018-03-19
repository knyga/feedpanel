const dbAsync = require('../utils/db.js');

module.exports = async function() {
  const db = await dbAsync();
  return db.define("feed", {
    title: String,
    description: String,
    link: String,
    thumbnail: String,
    pubDate: String,
  });
};

