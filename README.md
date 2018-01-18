BTC Markets WebSocket Client
===============

This exposes the websocket events available from the [BTC Markets API](https://github.com/BTCMarkets/API).

### Requirements

- Nodejs >= 8.9.4

### Install

`yarn add btc-markets-ws-api`

### Documentation

[Link to Documentation](https://azerothian.github.io/btc-markets-ws-api/)

### Example

```js
import BTCMarketsWS from "btc-markets-ws-api";
const wsClient = new BTCMarketsWS();

wsClient.subscribeTicker("BTC", "AUD");
wsClient.subscribeOrderBook("BTC", "AUD");
wsClient.subscribeTradeEvents("BTC", "AUD");

wsClient.on("ticker", (tickerResult) => {
  console.log("ticker", tickerResult);
});
wsClient.on("orderbook", (orderbookResult) => {
  console.log("orderbook", orderbookResult);
});
wsClient.on("trade", (tradeResult) => {
  console.log("trade", tradeResult);
});
wsClient.connect();

})();

```

### Development

- We use gulp with babel for source transpiling.
- `npm run test` or `jest` to run test the test cases
