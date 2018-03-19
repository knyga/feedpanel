const express = require('express');
const app = express();
const feedparser = require('feedparser-promised');
const orm = require("orm");

(async function() {
  const db = await orm.connectAsync('mysql://root:root@localhost:3306/feed');
  const Feed = db.define("feed", {
    title: String,
    description: String,
    link: String,
    thumbnail: String,
    pubDate: String,
  });


  app.set('view engine', 'ejs');
  app.get('/', async function (req, res) {
    const items = await Feed.findAsync();
    if(items && items.length) {
      res.render('index', {items});
    } else {
      res.render('index-no-data');
    }
  });

  app.get('/clear', async function(req, res) {
    await Feed.clear();
    res.send(200);
  });

  app.get('/admin', function(req, res) {
    res.render('admin');
  });

  app.get('/write', async function (req, res) {
    const httpOptions = {
      uri: req.query.url,
      timeout: 3000,
      gzip: true,
    };
    let items = [];

    try {
      items = (await feedparser.parse(httpOptions)).map(item => {
        const {title, description, link, image} = item;
        let thumbnail = '';
        let pubDate = '';

        if(item.pubDate) {
          pubDate = item.pubDate;
        } else if(item.pubdate) {
          pubDate = item.pubdate;
        } else if(item.data) {
          pubDate = item.date;
        }

        if(image && image.url) {
          thumbnail = image.url;
        } else {
          const mediaObj = item['media:thumbnail'];
          if(mediaObj) {
            const keys = Object.keys(mediaObj);
            if(keys.length > 0) {
              const mediaElement = mediaObj[keys[0]];
              thumbnail = mediaElement.url;
            }
          }
        }

        return {
          title,
          description,
          link,
          pubDate,
          thumbnail,
        };
      });
    } catch(e) {
      res.send(500);
      console.log(e);
    }

    let addedLength = items.length;
    for(let i=0; i<items.length; i++) {
      try {
        await Feed.createAsync(items[i]);
      } catch(e) {
        console.log(e);
        addedLength--;
      }
    }

    res.send({count: addedLength});
  });

  app.listen(3000, () => console.log('App listening on port 3000!'));
})();