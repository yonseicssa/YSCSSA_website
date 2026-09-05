import NotFoundContent from '@/components/NotFoundContent';
import { buildMetadata } from '@/lib/seo';
import { t } from '@/i18n/ui';

/**
 * 这个路由产出 out/404.html —— 托管平台找不到页面时返回的就是它。
 * 内容按访问路径的语言前缀在浏览器端切换（PRD 4.6）。
 */
export function generateMetadata() {
  return buildMetadata({
    lang: 'zh',
    path: '/404',
    title: t('zh', 'notFound.title'),
    description: t('zh', 'notFound.body'),
    noindex: true
  });
}

export default function Page() {
  return <NotFoundContent />;
}
