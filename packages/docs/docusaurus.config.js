const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const githubLink = 'https://bit.ly/3CMVaNs'

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'EzBackend',
  tagline: 'Create your backend in two lines of code',
  url: 'https://www.ezbackend.io/',
  baseUrl: '/',
  onBrokenLinks: 'warn', //Not sure if this will break
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'kapydev', // Usually your GitHub org/user name.
  projectName: 'ezbackend', // Usually your repo name.
  trailingSlash: 'false',
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap'
    }
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true
    },
    gtag: {
      trackingID: 'G-NYKC5QB870',
      anonymizeIP: true,
    },
    navbar: {
      title: 'EzBackend',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'dropdown',
          label: 'Developers',
          position: 'left',
          items: [
            {
              to: 'tech-stack',
              label: 'Tech Stack',
            },
            {
              label: 'Github',
              href: 'https://github.com/kapydev/ezbackend'
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/channel/UCXFyio7c5EWBGLknUJZjIzQ',
            },
            {
              label: 'CodeSandbox Demo',
              href: 'https://codesandbox.io/s/ezbackend-demo-ensk1?file=/src/index.ts',
            }
          ],
        },
        {
          to: 'pricing',
          label: 'Pricing',
          position: 'left'
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left'
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: '/docs/intro',
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
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/kapydev/ezbackend',
            },
          ],
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
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
  plugins: [ // URGENT TODO: THIS CURRENTLY NAMES FILES MANUALLY CAN WE DO IT PROPERLY WITH DOCUSAURUS
    // function renameMarkdown(context, options) {
    //   return {
    //     name: 'markdown-renamer',
    //     async loadContent() {

    //     },
    //     async contentLoaded({ content, actions }) {

    //       const fs = require('fs')
    //       const path = require('path')

    //       const listDir = (dir, pattern, replace, fileList = []) => {

    //         let files = fs.readdirSync(dir);

    //         files.forEach(file => {
    //           if (fs.statSync(path.join(dir, file)).isDirectory()) {
    //             fileList = listDir(path.join(dir, file), pattern, replace, fileList);
    //           } else {
    //             if (pattern.test(file)) {
    //               let name = file.replace(pattern, replace)
    //               let src = path.join(dir, file);
    //               let newSrc = path.join(dir, name);
    //               fileList.push({
    //                 oldSrc: src,
    //                 newSrc: newSrc
    //               });
    //             }
    //           }
    //         });

    //         return fileList;
    //       };

    //       const renameFiles = (foundFiles) => {
    //         foundFiles.forEach(f => {
    //           fs.renameSync(f.oldSrc, f.newSrc)
    //         })
    //       }

    //       const foundFiles = listDir(path.resolve(__dirname, 'docs/api'), /_ezbackend/, "ezbackend")
    //       renameFiles(foundFiles)
    //       console.log("loading has finished")
    //     }
    //   }
    // },
    // [
    //   'docusaurus-plugin-typedoc',
    //   {
    //     "githubPages": false,
    //     "readme": "none",
    //     "tsconfig": "../../tsconfig.json",
    //     "hideInPageTOC": true,
    //     "hideBreadcrumbs": true,
    //     "entryPointStrategy": "packages",
    //     "cleanOutputDir": false,
    //     "entryPoints": [
    //       "../auth",
    //       "../common",
    //       "../common-sequelize-fastify",
    //       "../core",
    //       "../db-ui",
    //       "../openapi"
    //     ]
    //   }
    // ]
  ],
};
