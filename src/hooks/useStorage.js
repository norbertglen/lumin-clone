import { useState } from 'react';

import storage from '../utils/storage';

export default function useStorage(name, _defaultValue = null) {
  let defaultValue = _defaultValue;

  const storedValue = storage.get(name);
  if (storedValue) defaultValue = storedValue;

  const [value, setStateValue] = useState(defaultValue);

  const setValue = (newValue) => {
    setStateValue(newValue);

    if (newValue) {
      storage.set(name, newValue);
    } else {
      storage.clear(name);
    }
  };

  return [value, setValue];
}
