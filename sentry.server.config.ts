import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://0b4e1147b16fddd7dbee71bd78876789@o4509467064074240.ingest.us.sentry.io/4509655016275968',

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Enable logs to be sent to Sentry
  _experiments: { enableLogs: true },

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
});
