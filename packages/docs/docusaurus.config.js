const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('path');

const githubLink = 'https://bit.ly/3CMVaNs';

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'EzBackend | Simplified Backend Setup',
  tagline: 'Simplified Backend Setup',
  url: 'https://www.ezbackend.io/',
  baseUrl: '/',
  onBrokenLinks: 'warn', // Not sure if this will break
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'kapydev', // Usually your GitHub org/user name.
  projectName: 'ezbackend', // Usually your repo name.
  trailingSlash: 'false',
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;600;700&display=swap',
  ],
  themeConfig: {
    metadata: [
      {
        name: 'description',
        content:
          'A Node framework focused on speed and ease of use, while keeping the ability to extend and customize',
      },
    ],
    hotjar: {
      siteId: '2653159',
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },
    navbar: {
      title: 'EzBackend',
      logo: {
        alt: 'EzBackend Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: 'pricing',
          position: 'left',
          label: 'Pricing',
        },
        {
          to: 'showcase',
          position: 'left',
          label: 'Showcase',
        },
        {
          type: 'dropdown',
          label: 'Developers',
          position: 'left',
          items: [
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/package/ezbackend',
            },
            {
              label: 'Github',
              href: 'https://github.com/kapydev/ezbackend',
            },
            {
              label: 'CodeSandbox',
              href: 'https://codesandbox.io/s/ezbackend-demo-ensk1?file=/src/index.ts',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'left',
          items: [
            {
              to: 'blog',
              label: '❤ Blog',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/RwgdruFJHc',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/channel/UCXFyio7c5EWBGLknUJZjIzQ',
            },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contact Us',
          items: [
            {
              html: 'Email: ezbackend@gmail.com',
            },
            {
              html: 'Phone: +65 9650 3241',
            },
            {
              html: 'Telegram: @StepKab00m',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/sFUVA3Ku5E',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/kapydev/ezbackend',
            },
          ],
        },
        {
          title: 'Enterprise',
          items: [
            {
              label: 'Pricing',
              to: '/pricing',
            },
          ],
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    algolia: {
      apiKey: 'd5ba2a84a8031e71d0e4c31a01dd41d4',
      indexName: 'ezbackend',
      contextualSearch: false,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        googleAnalytics: {
          trackingID: 'G-NYKC5QB870',
          anonymizeIP: true,
        },
        gtag: {
          trackingID: 'G-NYKC5QB870',
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/kapydev/ezbackend/edit/master/packages/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    path.resolve(__dirname, 'plugins/docusaurus-plugin-hotjar'),
  ],
};
