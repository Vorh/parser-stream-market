const request = require('request');
const HTMLParser = require('fast-html-parser');
const sleep = require('thread-sleep');
var List = require("collections/list");

const APP_ID = 730;
const ALL_COUNT = 1000;
const PAGE_SIZE = 50;

let countPerSecond = 0;


let listItems = new List();

setInterval(()=>{

    console.log(listItems.length);

    for(let i = 0; i < 10; i++){
        if (countPerSecond >= ALL_COUNT) {
            return;
        }

        getItems(countPerSecond);
        countPerSecond = countPerSecond + PAGE_SIZE;

        console.log(countPerSecond);
    }



},15000);

function getItems(offset) {

    let url = 'http://steamcommunity.com/market/search/render?appid=' + APP_ID + '&query=&start=' + offset + '&count=' + PAGE_SIZE;

    console.log(url);

    request(url, {json: true, style: false, script: false}, (err, res, body) => {

        if (err) {
            return console.log(err);
        }

        let root = HTMLParser.parse(body.results_html);
        let countResultItem = 0;


        for (; countResultItem < PAGE_SIZE; countResultItem++) {
            let s = '#result_' + countResultItem + '_name';

            let item = root.querySelector('#result_' + countResultItem + '_name.market_listing_item_name').childNodes[0].rawText;
            listItems.add(item);
        }

    });
}




