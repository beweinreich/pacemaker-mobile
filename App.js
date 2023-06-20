import * as Sentry from "sentry-expo";
import Constants from "expo-constants";
import App from "./src/index";
export default App;

Sentry.init({
  dsn: "https://31e0b3759a1e4d28a7f3c1913c9f2fba@sentry.io/1520271",
  enableInExpoDevelopment: false,
  debug: true,
  release: Constants.manifest.revisionId,
});
