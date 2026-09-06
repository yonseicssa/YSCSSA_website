# YSCSSA 官方网站（一期）

延世大学中国学生学者联谊会官方网站。技术栈：**Next.js（App Router）静态导出 + React + Git 内容后台**。
本仓库按《官方网站产品需求文档 PRD · 一期》v1.6 实现。

构建产物是纯静态 HTML/CSS/JS（`out/`），没有服务器、没有数据库，也不收集访客信息。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 生成 out/（纯静态文件）
npm start        # 本地预览构建结果（npx serve out）
npm run check    # TypeScript 类型检查
```

## 目录结构

```
src/
  app/              路由（Next.js App Router）
    (zh)/           中文站，根路径 /
    (ko)/ko/        韩语站，/ko 前缀
    sitemap.ts      sitemap.xml
  components/       React 组件
    views/          各页面的实际内容（中韩共用同一份组件）
  content/          内容（后台改的就是这些文件）
    events/         活动，一场一个 md
    guides/         新生指南，一篇一个 md
    pages/zh|ko/    首页简介、关于我们、合作与赞助的文案
    departments/    组织架构：部门与下属小组（一期不含成员）
    settings/       site.json（壁纸、主打活动、平台入口、公共邮箱）
                    contact.json（合作与赞助页的两张名片）
  lib/              内容读取、排序、状态判定、日期、SEO
  i18n/ui.ts        全部界面文字（中韩）
  styles/global.css 设计系统（配色、字体、间距、组件样式）
scripts/prebuild.mjs 构建前生成 git 更新时间、壁纸的两种尺寸与指南搜索索引
public/
  admin/            内容后台（Sveltia CMS，脚本走 jsDelivr）
  images/           网页版压缩图片
legacy-react/       旧版 React SPA，仅作对照，可整目录删除
```

### 页面怎么加

每个路由文件都只有几行，真正的页面内容在 `src/components/views/` 里。例如中文的关于我们页：

```tsx
// src/app/(zh)/about/page.tsx
import About from '@/components/views/About';
export default function Page() {
  return <About lang="zh" />;
}
```

中韩两版共用同一个 `About` 组件，靠 `lang` 参数取不同的文案，所以改版式只改一处。

## URL 规则（PRD 2.2）

| 页面 | 中文 | 韩语 |
|---|---|---|
| 首页 | `/` | `/ko` |
| 关于我们 | `/about` | `/ko/about` |
| 活动列表 | `/events` | `/ko/events` |
| 活动详情 | `/events/2026-09-25` | `/ko/events/2026-09-25` |
| 新生指南 | `/guide` | `/ko/guide` |
| 指南详情 | `/guide/arc-application` | `/ko/guide/arc-application` |
| 合作与赞助 | `/partnership` | `/ko/partnership` |

- 活动详情 URL 由**开始日期自动生成**；同一天多场时第二场起追加序号（`-2`）。
- 指南 URL 由编辑填写英文短名，**发布后不得修改**（会导致外部引用失效）。
- 活动列表**不分页**。筛选在浏览器端执行，若分页则筛选只作用于当前页的数据、结果错误。
  按每年二三十场估算，三年约九十张卡片；总数超过六十场后再评估「加载更多」或按年份折叠。

## 内容后台

地址：`https://<域名>/admin`（导航栏右上角的「登录」按钮即指向这里），用 GitHub 账号登录，
每人一个独立账号。该入口已加 `rel="nofollow"`，并在 `robots.txt` 与 sitemap 中排除，不会被搜索引擎收录。
保存即提交到仓库，托管平台自动构建，**通常 1–2 分钟后线上生效**。

上线前需要做的三件事：

1. 改 `public/admin/config.yml` 里的 `backend.repo` 为实际仓库。
2. 配置 GitHub OAuth：
   - **Netlify**：启用 Identity + Git Gateway，把 `backend.name` 改为 `git-gateway`。
   - **Cloudflare Pages / 其他**：部署一个 OAuth 代理（如 `sveltia-cms-auth` Worker），
     把地址填进 `config.yml` 的 `base_url`。
3. 改 `src/lib/site.ts` 里的 `SITE_URL` 与 `public/robots.txt` 里的 Sitemap 地址为正式域名。

### 权限（PRD 5.1 / 5.2）

后台身份就是 GitHub 账号，权限由仓库协作者权限决定：

- **管理员** = 仓库 Admin：管理账号、编辑全部内容。
- **编辑** = 仓库 Write：维护活动与新生指南。

> **已知边界**：Git 型后台无法按集合限制某个账号只能改哪部分内容。若要严格执行
> 「编辑不可改页面文案与全站设置」，需要：打开 `config.yml` 里的 `publish_mode: editorial_workflow`
> （改动先进 PR），再对 `src/content/pages/`、`src/content/settings/` 配置 CODEOWNERS +
> 分支保护，要求管理员审核。代价是这些内容的发布多一步合并操作。
>
> 成员离任后一周内在仓库协作者列表中移除其账号。

**交接要求（PRD 5.1）**：仓库或组织须设置**至少两名所有者**（建议会长与技术负责人）。
只有一名所有者时，该成员毕业或账号异常将导致无人能添加成员或修改设置。
所有者账号的两步验证恢复码须打印或存放于学联公共云盘，与账号信息一并归档。
代码仓库主分支须开启保护、禁止直接推送；后台产生的内容提交不受此限制。

### 修改记录与回退

所有改动都是 Git 提交，作者是操作人本人。回退方式：在 GitHub 上找到对应提交，
点 **Revert**，或让开发组执行 `git revert <commit>`。

## 图片规范（PRD 6.2）

- 原图存学联公共邮箱的云盘，按年份与活动分文件夹长期保留；仓库只放压缩后的网页版本。
- 路径：`public/images/{模块}/{年份}/`。
- 除首页壁纸外，一律 **WebP，长边不超过 1600px**。
- **首页壁纸不用手工压缩**：后台只上传一张原图，构建时由 `sharp` 生成桌面版
  （长边 2400px ≤ 300KB）与移动版（长边 1200px ≤ 120KB），浏览器按屏幕宽度自动选择。
- **每张图必须填写说明文字（alt）**，后台里是必填项。
- 所有图片引用都经过 `src/lib/images.ts`；日后迁移到对象存储只改这一处。
- 当前仓库内的图片是 **SVG 占位图**，上线前需全部替换为真实照片。

## 一期实现说明

**活动状态实时计算。** 首屏 HTML 用构建时算好的状态（保证不开 JS、搜索引擎抓取时也正确），
页面挂载后由浏览器按当前时间重算，列表分组顺序同样重排
（`components/HomeEvents.tsx`、`components/EventsBrowser.tsx`、`components/EventStatusBadge.tsx`）。
因此即使长期没有重新部署，过期活动也不会一直显示「即将举行」。

排序规则只有一份，写在 `lib/eventOrder.ts` 的纯函数里，服务端与浏览器共用，
首屏与挂载后不会算出两种结果。改排序只改这一个文件。

**主打活动。** 全站唯一，在 `content/settings/site.json` 的 `featuredEvent` 里指定（后台可改），
不做成每场活动的开关——设置项天然保证唯一，且「当前主打哪场」一眼可见。
横幅在活动页顶部常驻，不随筛选变化；被主打的活动仍正常出现在下方列表中。
**不自动下架**，活动结束后需由编辑手动更换。

**首页壁纸的两种尺寸。** `scripts/prebuild.mjs` 用 `sharp` 从一张原图生成，产物在
`public/images/wallpaper/generated/`（已 gitignore，每次构建重新生成）。
体积上限用两级策略保证：先降质量，仍超标再缩尺寸，两级都试完还超标**让构建失败**——
这两个体积是 PRD 第八节的验收硬指标，也决定 7.1 的首屏 3 秒与 1.5MB 页面预算。
构建失败意味着这次改动不部署，线上仍是上一版，编辑能在日志里看到原因。

**指南搜索。** 静态站的搜索在浏览器端执行，常见方案按空格分词，中文会搜不到。
本站改为：构建前把标题、摘要与正文输出到 `public/guide-index.json`（`scripts/prebuild.mjs`），
前端做子串匹配，中文关键词必定可检索（已验证「登录证」可命中正文）。

**最后更新日期。** 优先取该文件最后一次 Git 提交时间（`scripts/prebuild.mjs` 在构建前生成），
编辑无需填写；构建环境没有 git 历史时回退到 frontmatter 里的 `updated`。对外只显示到月份。

**中韩两套 root layout。** `(zh)` 与 `(ko)` 两个路由组各有自己的 `layout.tsx`，
这样 `<html lang>` 才能分别输出 `zh` 与 `ko`。代价是跨语言跳转必须整页刷新，
所以导航栏的语言切换用的是 `<a>` 而不是 `<Link>`——改这里时别换回 `Link`，否则切换会失效。

**字体自托管。** 用 `next/font` 在构建时下载 Inter 与 Montserrat 并随站点分发，
运行时不向 Google Fonts 发请求：少一个外部依赖，中国大陆访问也更稳。

**404 的已知边界。** Next 静态导出对 `out/404.html` 这个文件名有专门处理，
它的 `<head>` 取自 root layout，不走 `(zh)/404/page.tsx` 的 `generateMetadata`，
因此浏览器标签上显示的是站点名而不是「页面不存在」。页面正文、语言切换与 `noindex` 均正常，
且 404 本就不被收录，故未为此调整结构。`out/ko/404.html` 不受影响，metadata 完整。

**韩语范围。** 界面文字、首页简介、关于我们、合作与赞助、404 为中韩双语；
活动与新生指南的标题与正文只有中文，韩语界面下显示中文原文，不加任何提示（PRD 3.2）。

## 部署

构建命令 `npm run build`，**输出目录 `out`**（不是 `dist`，那是旧版 Vite 站点的目录）。
仓库里的 `vercel.json` 已经把这两项固定住了，Vercel 会以它为准，面板里的旧设置不用管。

> **不要在 `vercel.json` 里加 SPA 重写规则**（`{"source": "/(.*)", "destination": "/index.html"}`）。
> 那是旧版 React SPA 需要的：单页应用只有一个 HTML，所有路径都得回落到它。
> 本站是静态多页，每个页面都有自己的 HTML，加了这条规则会导致**所有网址都显示首页**。
>
> 万一这个文件不被接受，退路是删掉它，改在 Vercel 项目设置里手动配：
> Framework Preset 选 **Next.js**，Output Directory 覆盖为 **out**（默认残留的 `dist`
> 是旧版 Vite 站点的目录）。

可选平台：

- **Cloudflare Pages**（推荐：中国大陆访问相对稳定，且与 Cloudflare Web Analytics 同平台）
- **Vercel**（部署最省事；但 vercel.app 域名在中国大陆通常不可访问，
  若要满足 PRD 7.2 的大陆访问实测，需要绑定自有域名并实测，或改用 Cloudflare Pages）
- Netlify（后台 OAuth 配置最省事）

`public/_redirects`（韩语路径的 404 规则）只有 Netlify 与 Cloudflare Pages 会读；
Vercel 上不生效，但根 404 页面本身会按路径前缀切换语言，所以行为一致。

访问统计：在托管平台加环境变量 `NEXT_PUBLIC_CF_BEACON_TOKEN`，值为 Cloudflare Web Analytics 的
beacon token，页面会自动带上统计脚本；不设则不加载任何统计代码。

## 上线前必须完成的事项

- [ ] 域名、托管、仓库、后台账号全部归属学联公共邮箱
- [ ] `src/lib/site.ts` 的 `SITE_URL` 与 `robots.txt` 的 Sitemap 改为正式域名
- [ ] 替换全部占位图（壁纸、活动封面、二维码、Logo）
- [ ] 韩语文案由韩语流利的成员通读定稿
- [ ] 合作与赞助页的两张名片：替换名片图、填入姓名与微信号，邮箱确认为域名邮箱
- [ ] 组织架构的部门与下属小组按当届实际结构核对
- [ ] 仓库设有至少两名所有者，两步验证恢复码已归档；主分支已开启保护
- [ ] 中国大陆访问实测
- [ ] 移动端 4G 首屏渲染 ≤ 3 秒实测
- [ ] `robots.txt` 未屏蔽、`sitemap.xml` 可访问

完整验收清单见《维护手册》`docs/维护手册.md`。
