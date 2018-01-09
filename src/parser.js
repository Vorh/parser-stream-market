const request = require('request');
const HTMLParser = require('fast-html-parser');
const sleep = require('thread-sleep');

const APP_ID = 730;
const ALL_COUNT = 500;
// const ALL_COUNT = 10;
const PAGE_SIZE = 10;
let OFFSET = 0;

let countPerSecond = 0;



for (; OFFSET < ALL_COUNT;) {

    let url = 'http://steamcommunity.com/market/search/render?appid=' + APP_ID + '&query=&start='+OFFSET+'&count=' + PAGE_SIZE;
    console.log('URL: ' + url);

    OFFSET = OFFSET + PAGE_SIZE;

    if (countPerSecond===1){
        countPerSecond=0;
        sleep(1500);
    }

    countPerSecond++;

    request(url, {json: true, style: false, script: false}, (err, res, body) => {

        if (err) {
            return console.log(err);
        }

        let root = HTMLParser.parse(body.results_html);
        let countResultItem = 0;


        for (; countResultItem < PAGE_SIZE; countResultItem++) {
            let s = '#result_' + countResultItem + '_name';
            try {
                console.log(root.querySelector('#result_' + countResultItem + '_name.market_listing_item_name').childNodes[0].rawText);
            } catch (e) {
                console.log(e)
            }
        }


    });


}









