const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'FinClip 运维文档',
  tagline: '稳定、可靠、可扩展的私有化小程序平台',
  url: 'https://docs.finclip.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'finogeeks', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      logo: {
        alt: '凡泰极客 - FinClip',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
          position: 'left',
          label: '运维文档',
        },
        {to: '/blog', label: '博客', position: 'left'},
        {
          href: 'https://github.com/finogeeks/finclip-docs',
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
              label: '运维文档',
              to: '/docs/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/finogeeks',
            },
            {
              label: '开发者社区',
              href: 'https://developer.finogeeks.com/',
            },
            {
              label: '小程序生态圈',
              href: 'https://finclip.com/#/ecosystem',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: '博客',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/finogeeks',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FinoGeeks, Inc.`,
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
//          editUrl:
//            'https://github.com/finogeeks/finclip-docs/docs',
         },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/finogeeks/finclip-docs/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
