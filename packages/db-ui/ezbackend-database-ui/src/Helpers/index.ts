export function getBaseURL() {
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_URL;
  }
  if (process.env.NODE_ENV === "production") {
    return window.location.protocol + "//" + window.location.host;
  }
}
