require('dotenv').config();

const flags = {
  FAST_DEV: true,
};

const siteMetadata = {
  title: `USACO Guide`,
  description: `A free collection of curated, high-quality competitive programming resources to take you from USACO Bronze to USACO Platinum and beyond. Written by top USACO Finalists, these tutorials will guide you through your competitive programming journey.`,
  author: `@usacoguide`,
  siteUrl: `https://usaco.guide/`,
  keywords: ['USACO', 'Competitive Programming', 'USACO Guide'],
};

const plugins = [
  {
    resolve: 'gatsby-plugin-sitemap',
    options: {
      excludes: ['/license/', '/editor/'],
    },
  },
  {
    resolve: `gatsby-plugin-typescript`,
    options: {
      allowNamespaces: true,
    },
  },
  /* any images referenced by .mdx needs to be loaded before the mdx file is loaded. */
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/src/assets`,
      name: `assets`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content`,
      name: `content-images`,
      ignore: [`**/*.json`, `**/*.mdx`],
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/solutions`,
      name: `solution-images`,
      ignore: [`**/*.json`, `**/*.mdx`],
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content`,
      name: `content`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/solutions`,
      name: `solutions`,
    },
  },
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-postcss`,
  },
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-catch-links`,
  `gatsby-transformer-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `USACO Guide`,
      short_name: `USACO`,
      start_url: `/`,
      background_color: `#113399`,
      theme_color: `#113399`,
      display: `minimal-ui`,
      icon: `src/assets/logo-square.png`, // This path is relative to the root of the site.
    },
  },
  {
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: ['G-1JGYFFBHXN'],
      pluginConfig: {
        head: false,
      },
    },
  },
  {
    // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
    resolve: 'gatsby-plugin-algolia',
    options: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
      queries: require('./src/utils/algolia-queries'),
      enablePartialUpdates: true,
      skipIndexing: !process.env.ALGOLIA_APP_ID,
    },
  },
  // devMode currently has some sketchy output
  // See https://github.com/JimmyBeldone/gatsby-plugin-webpack-bundle-analyser-v2/issues/343
  // {
  //   resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
  //   options: {
  //     devMode: false,
  //   },
  // },
  `gatsby-plugin-meta-redirect`,
];

module.exports = {
  flags,
  siteMetadata,
  plugins,
  graphqlTypegen: {
    generateOnBuild: true,
  },
};
