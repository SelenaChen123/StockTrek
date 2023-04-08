import requests
from bs4 import BeautifulSoup
import yfinance as yf

BASE_URL = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
res = requests.get(BASE_URL)
content = res.text
soup = BeautifulSoup(content, 'html.parser')
tbl = soup.find(id="constituents")
rows = tbl.find_all('tr')
stock_names = [row.find('td').a.string for row in rows[1:]]

# TODO double-check BRK.B and BF.B

tickers = yf.Tickers(' '.join(stock_names))
for stock in stock_names:
    hist = tickers.tickers[stock].history(period="5y")
    with open('data/' + stock + '.csv', 'w') as f:
        f.write(hist.to_csv(index=True))