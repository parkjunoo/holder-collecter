const express = require("express");
const Crawler = require("crawler");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`start app listening at http://localhost:${port}`);
});

var c = new Crawler({
  maxConnections: 10,
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      console.log($("title").text());
      console.log($);
    }
    done();
  },
});

c.queue("http://www.naver.com");
