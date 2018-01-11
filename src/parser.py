import requests
try:
    from BeautifulSoup import BeautifulSoup
except ImportError:
    from bs4 import BeautifulSoup


APP_ID = 730
ALL_COUNT = 1050
PAGE_SIZE = 50

countPerSecond = 0
offset = 0


for x in range(0, 1):
    print(str(x) + " " + str(offset))
    url = 'http://steamcommunity.com/market/search/render?appid=' + str(APP_ID) + '&query=&start=' + str(offset) + \
          '&count=' + str(PAGE_SIZE)
    offset = offset+PAGE_SIZE
    print(url)

    r = requests.get(url)
    html = r.json()['results_html']
    parse = BeautifulSoup(html,'html.parser')
    for y in range(1, PAGE_SIZE):
        idDiv = 'result_' + str(y) + '_name'
        result = parse.find(id=idDiv)
        print(result.getText())




