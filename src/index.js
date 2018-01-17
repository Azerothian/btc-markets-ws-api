import socketIOClient from "socket.io-client";
import { EventEmitter } from "events";
/**
 *
 *
 * @export
 * @class BTCMarketsWS
 * @extends {EventEmitter}
 */
export default class BTCMarketsWS extends EventEmitter {
  constructor() {
    super();
    this.socket = socketIOClient("https://socket.btcmarkets.net", {
      secure: true,
      transports: ["websocket"],
      upgrade: false,
      autoConnect: false,
    });
    this.connected = false;
    this.socket.on("connect", () => this.onConnected());
    this.channels = [];
    this.socket.on("newTicker", (data) => {
      return this.emit("ticker", data);
    });
    this.socket.on("OrderBookChange", (data) => {
      return this.emit("orderbook", data);
    });
    this.socket.on("MarketTrade", (data) => {
      return this.emit("trade", data);
    });
    this.socket.on("error", (data) => {
      return this.emit("error", data);
    });
  }
  onConnected() {
    if (this.channels.length > 0) {
      this.channels.forEach((channel) => {
        return this.socket.emit("join", channel);
      });
    }
    return this.emit("connect");
  }
  /**
   *
   *
   *
   * @memberof BTCMarketsWS
   */
  connect() {
    return this.socket.connect();
  }
  /**
   *
   *
   * @memberof BTCMarketsWS
   */
  disconnect() {
    return this.socket.disconnect();
  }
  /**
   *
   *
   * @param {any} instrument
   * @param {any} currency
   * @memberof BTCMarketsWS
   */
  subscribeTicker(instrument, currency) {
    const channelName = `Ticker-BTCMarkets-${instrument}-${currency}`;
    this.channels.push(channelName);
    if (this.connected) {
      return this.socket.emit("join", channelName);
    }
    return undefined;
  }
  /**
   *
   *
   * @param {any} instrument
   * @param {any} currency
   * @memberof BTCMarketsWS
   */
  subscribeOrderBook(instrument, currency) {
    const channelName = `Orderbook_${instrument}${currency}`;
    this.channels.push(channelName);
    if (this.connected) {
      return this.socket.emit("join", channelName);
    }
    return undefined;
  }
  /**
   *
   *
   * @param {any} instrument
   * @param {any} currency
   * @memberof BTCMarketsWS
   */
  subscribeTradeEvents(instrument, currency) {
    const channelName = `TRADE_${instrument}${currency}`;
    this.channels.push(channelName);
    if (this.connected) {
      return this.socket.emit("join", channelName);
    }
    return undefined;
  }
}