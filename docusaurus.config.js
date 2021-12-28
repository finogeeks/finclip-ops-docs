const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'FinClip 运维文档',
  tagline: '稳定、可靠、可扩展的私有化小程序平台',
  url: 'https://devops.finclip.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'finogeeks',
  projectName: 'finclip-ops-docs',
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
          href: 'https://github.com/finogeeks/finclip-ops-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            { label: '产品文档',
              href: 'https://www.finclip.com/mop/document/',
            },
            {
              label: '运维文档',
              to: '/docs/introduction',
            },
          ],
        },
        {
          title: '开发资源',
          items: [
            { 
              label: '资源下载中心',
              href: 'https://www.finclip.com/downloads'
            },
            {
              label: '小程序应用市场',
              href: 'https://www.finclip.com/market',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/finogeeks',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'FinClip官网',
              href: 'https://www.finclip.com/',
            },
            {
              label: '运维博客',
              to: '/blog',
            },
            {
              label: '产品博客',
              href: 'https://www.finclip.com/blog/',
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
//            'https://github.com/finogeeks/finclip-ops-docs/docs',
         },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/finogeeks/finclip-ops-docs/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
