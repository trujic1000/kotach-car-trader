import {
  createImageUrlBuilder,
  createClient,
  createPreviewSubscriptionHook,
} from "next-sanity";

import {config} from "./config";

export const imageBuilder = (source) =>
  createImageUrlBuilder(config).image(source);
export const usePreviewSubscription = createPreviewSubscriptionHook(config);
export const client = createClient(config);
export const previewClient = createClient({
  ...config,
  useCdn: false,
});

export const getClient = (usePreview) => (usePreview ? previewClient : client);
export default client;
