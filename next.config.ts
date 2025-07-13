import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
};

import { withSentryConfig } from '@sentry/nextjs';

const moduleExports = {
  productionBrowserSourceMaps: true,
};

const sentryWebpackPluginOptions = {
  silent: true,
};

export default withSentryConfig(moduleExports, sentryWebpackPluginOptions);
