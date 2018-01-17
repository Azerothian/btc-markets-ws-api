BTC Markets WebSocket Client
===============

This exposes the websocket events available from the [BTC Markets API](https://github.com/BTCMarkets/API).

### Requirements

- Nodejs >= 8.9.4

### Install

`npm install btc-markets-ws-api`

### Documentation

[Link to Documentation](https://azerothian.github.io/btc-markets-ws-api/)

### Example

```js
import BTCMarketsWS from "btc-markets-ws-api";
(async() => {
    try {
        const client = new BTCMarketsWS();

    } catch (err) {
        console.log(err);
    }

})();

```

### Development

- We use gulp with babel for source transpiling.
- `npm run test` or `jest` to run test the test cases
