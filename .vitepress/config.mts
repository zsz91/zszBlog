import { defineConfig } from 'vitepress'
import nav from './nav.mjs';
import sidebar from "./sidebar.mjs";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "钟是志 Blog",
  description: "前端技术分享",
  srcDir: 'docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    search: {
      provider: 'local',
    },

    sidebar: {...sidebar},
    footer: {
      copyright: '创作不易,请尊重他人劳动成果',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
