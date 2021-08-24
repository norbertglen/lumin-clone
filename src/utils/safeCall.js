export default function safeCall(callback, fallbackValue) {
  try {
    return callback();
  } catch (e) {
    return fallbackValue;
  }
}
