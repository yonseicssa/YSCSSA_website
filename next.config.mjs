/** @type {import('next').NextConfig} */
const nextConfig = {
  // 全静态导出：构建产物是纯 HTML/CSS/JS，可直接放 Cloudflare Pages / Netlify
  output: 'export',
  // 静态导出不跑图片优化服务，图片按 PRD 6.2 在上传前压缩好
  images: { unoptimized: true },
  trailingSlash: false
};

export default nextConfig;
