export default function safeCall(callback: Function, fallbackValue: any) {
  try {
    return callback();
  } catch (e) {
    return fallbackValue;
  }
}
