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

  const holders = await getHolders($);

};

const getHolders = async function ($target) {
  const holders = [];

  const $holderList = $target("tbody").children("tr");
  console.log("!!, ", $holderList);
  $holderList.each(function (i, elem) {
    const $td = $target(elem).children("td");
    const $address = $td.eq(1);
    const $amount = $td.eq(2);
    if ($td && $address && $amount) {
      holders.push({
        address: $address.text().trim(),
        amount: $amount.text().trim(),
      });
    }
  });
  return holders;
};

parsing();
