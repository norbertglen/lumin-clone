import safeCall from './safeCall';

let values = {};

const storageUtils = {
  set(key: string, value: any) {
    if ('localStorage' in window) {
      if ([undefined, null].includes(value)) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } else if ([undefined, null].includes(value)) {
      delete values[key];
    } else {
      values[key] = value;
    }
  },

  get(key: string) {
    if ('localStorage' in window) {
      const value = window.localStorage.getItem(key);

      if (value) return safeCall(() => JSON.parse(value), null);
    }

    return values[key];
  },

  clear(...keys: string[]) {
    if (keys.length > 0) {
      keys.forEach(key => this.set(key, undefined));
    } else if ('localStorage' in window) {
      window.localStorage.clear();
    } else {
      values = {};
    }
  }
};

export default storageUtils