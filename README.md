# nodeVSA

None of my stock trading software does exactly what I want it to, so I figured I'd just build a tool.

Retrieves stock data for a list of your tickers, cleans it, and (eventually) scans for supply and demand tests, which are a pretty decent trading signal.

## How to:

Run `git clone https://github.com/wnmurphy/nodeVSA.git`

Run `npm install` to install dependencies.

Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key) and get an API key.

Create a `config.js` file with `module.exports = { API_KEY : YOUR_API_KEY};`

Run `node nodeVSA`.