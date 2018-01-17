import BTCMarketsWS from "./index";
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
