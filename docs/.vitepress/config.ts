import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "super-result",
  description: "Lightweight railway-oriented error handling for TypeScript",
  themeConfig: {
    logo: '/banner.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Core Concepts', link: '/guide/concepts' },
          { text: 'Philosophy', link: '/guide/philosophy' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Result & ResultAsync', link: '/api/types' },
          { text: 'from & fromUnknown', link: '/api/from' },
          { text: 'createResult', link: '/api/factory' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/simwai/super-result' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present simwai'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/banner.svg' }]
  ]
})
