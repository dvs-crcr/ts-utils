export default class EventBus {
  listeners: {
    [index: string]: Function[]
  };

  constructor() {
    this.listeners = {};
  }

  subscribe(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  publish(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach(listener => listener(...args));
  }

  off(event: string, callback: Function) {
		if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
  }

}