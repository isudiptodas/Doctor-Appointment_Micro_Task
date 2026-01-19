import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

export const arcjet = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
        "CATEGORY:PREVIEW",
      ],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10, 
      capacity: 20, 
    }),
  ],
});
