// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 上线前把 site 改成正式域名，sitemap.xml、canonical、hreflang 都依赖它。
export const SITE_URL = 'https://yscssa.org';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // 后台入口与 404 页面不进 sitemap
      filter: (page) => !page.includes('/admin') && !page.includes('/404')
    })
  ]
});
