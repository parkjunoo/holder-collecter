const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`start app listening at http://localhost:${port}`);
});

const getPage = async function (targetUrl) {
  return await axios.get(targetUrl);
};

const parsing = async function () {
  const $html = await getPage(
    "https://bscscan.com/token/tokenholderchart/0x9b08f10d8c250714f6485212300a7b72f973f1fd?range=500"
  );

  const $ = cheerio.load($html.data);
  const $holderList = $("tbody").children("tr");
  $holderList.each(function (i, elem) {
    const $td = $(elem).children("td");
    const $address = $td.eq(1);
    const $amount = $td.eq(2);
    console.log($address.text(), $amount.text());
  });
  console.log($holderList.length);
};

parsing();
