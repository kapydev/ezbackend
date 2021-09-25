const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
  plugins: [ // URGENT TODO: THIS CURRENTLY NAMES FILES MANUALLY CAN WE DO IT PROPERLY WITH DOCUSAURUS
    function renameMarkdown(context, options) {
      return {
        name: 'markdown-renamer',
        async loadContent() {

        },
        async contentLoaded({ content, actions }) {

          const fs = require('fs')
          const path = require('path')

          const listDir = (dir, pattern, replace, fileList = []) => {

            let files = fs.readdirSync(dir);

            files.forEach(file => {
              if (fs.statSync(path.join(dir, file)).isDirectory()) {
                fileList = listDir(path.join(dir, file), pattern, replace, fileList);
              } else {
                if (pattern.test(file)) {
                  let name = file.replace(pattern, replace)
                  let src = path.join(dir, file);
                  let newSrc = path.join(dir, name);
                  fileList.push({
                    oldSrc: src,
                    newSrc: newSrc
                  });
                }
              }
            });

            return fileList;
          };

          const renameFiles = (foundFiles) => {
            foundFiles.forEach(f => {
              fs.renameSync(f.oldSrc, f.newSrc)
            })
          }

          const foundFiles = listDir(path.resolve(__dirname, 'docs/api'), /_ezbackend/, "ezbackend")
          renameFiles(foundFiles)
          console.log("loading has finished")
        }
      }
    },
    [
      'docusaurus-plugin-typedoc',
      {
        "githubPages": false,
        "readme": "none",
        "tsconfig": "../../tsconfig.json",
        "hideInPageTOC": true,
        "hideBreadcrumbs": true,
        "entryPointStrategy": "packages",
        "cleanOutputDir": false,
        "entryPoints": [
          "../auth",
          "../common",
          "../common-sequelize-fastify",
          "../core",
          "../db-ui",
          "../openapi"
        ]
      }
    ]
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true
    },
    gtag: {
      // You can also use your "G-" Measurement ID here.
      trackingID: 'G-NYKC5QB870',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
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
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/kapydev/ezbackend',
          label: 'GitHub',
          position: 'right',
        },
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
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
            {
              label: 'Discord',
              href: 'https://discord.gg/sFUVA3Ku5E',
            },
            // {
            //   label: 'Twitter',
            //   href: 'https://twitter.com/docusaurus',
            // },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/kapydev/ezbackend',
            },
          ],
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
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
};
