import socketIOClient from "socket.io-client";
import { EventEmitter } from "events";

/**
 * BTC Markets WebSocket Client
 * @class
 */
class BTCMarketsWS extends EventEmitter {
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
      /**
       * Ticker event
       *
       * @event BTCMarketsWS#ticker
       * @type {object}
       */
      return this.emit("ticker", data);
    });
    this.socket.on("OrderBookChange", (data) => {
      /**
       * Orderbook event
       *
       * @event BTCMarketsWS#orderbook
       * @type {object}
       */
      return this.emit("orderbook", data);
    });
    this.socket.on("MarketTrade", (data) => {
      /**
       * Trade event
       *
       * @event BTCMarketsWS#trade
       * @type {object}
       */
      return this.emit("trade", data);
    });
    this.socket.on("error", (data) => {
      /**
       * Ticker event
       *
       * @event BTCMarketsWS#error
       * @type {object}
       */
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
   * Connects the socket
   *
   *
   * @memberof BTCMarketsWS
   */
  connect() {
    return this.socket.connect();
  }
  /**
   * Disconnects the socket
   *
   * @memberof BTCMarketsWS
   */
  disconnect() {
    return this.socket.disconnect();
  }
  /**
   * Joins a specific socket-io channel
   *
   * @param {any} channelName
   * @memberof BTCMarketsWS
   */
  join(channelName) {
    this.channels.push(channelName);
    if (this.connected) {
      return this.socket.emit("join", channelName);
    }
    return undefined;
  }
  /**
   * Subscribe to the 'ticker' event
   *
   * @param {any} instrument
   * @param {any} currency
   * @memberof BTCMarketsWS
   */
  subscribeTicker(instrument, currency) {
    return this.join(`Ticker-BTCMarkets-${instrument}-${currency}`);
  }
  /**
   * Subscribe to the orderbook event
   *
   * @param {any} instrument
   * @param {any} currency
   * @memberof BTCMarketsWS
   */
  subscribeOrderBook(instrument, currency) {
    return this.join(`Orderbook_${instrument}${currency}`);
  }
  /**
   * Subscribe to the trade event
   *
   * @param {any} instrument
   * @param {any} currency
   * @memberof BTCMarketsWS
   */
  subscribeTradeEvents(instrument, currency) {
    return this.join(`TRADE_${instrument}${currency}`);
  }
}

export default BTCMarketsWS;
