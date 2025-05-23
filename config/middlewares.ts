export default [
    'strapi::errors',
    'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      name: "strapi::cors",
      resolve: "strapi::cors",
      origin: ['*'],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      headers: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },
  'strapi::logger',
  'strapi::errors',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
