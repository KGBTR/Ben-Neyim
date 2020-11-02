import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import {store} from "./store";

// import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: process.env['SENTRY_DSN'],
  integrations: [
    new VueIntegration({
      // Vue: Vue, // BUG:  Vue 3 entegration failed :(
      tracing: true,
      logErrors: true,
    }),
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
