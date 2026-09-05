# YSCSSA 官方网站（一期）

延世大学中国学生学者联谊会官方网站。技术栈：**Astro 静态站点 + Git 内容后台**。
本仓库按《官方网站产品需求文档 PRD · 一期》v1.0 实现。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 生成 dist/
npm run preview  # 本地预览构建结果
npm run check    # 类型与模板检查
```

## 目录结构

```
src/
  content/          内容（后台改的就是这些文件）
    events/         活动，一场一个 md
    guides/         新生指南，一篇一个 md
    pages/zh|ko/    首页简介、关于我们、合作与赞助的文案
    departments/    组织架构：部门与成员
    settings/       壁纸、平台入口、公共邮箱
  components/views/ 各页面的实际内容（中韩共用）
  pages/            路由；/ 为中文，/ko 为韩语
  lib/              排序、状态判定、日期、图片路径
  i18n/ui.ts        全部界面文字（中韩）
  styles/global.css 设计系统（配色、字体、间距、组件样式）
public/
  admin/            内容后台（Sveltia CMS，脚本走 jsDelivr）
  images/           网页版压缩图片
legacy-react/       旧版 React 站点，仅作对照，可整目录删除
```

## URL 规则（PRD 2.2）

| 页面 | 中文 | 韩语 |
|---|---|---|
| 首页 | `/` | `/ko` |
| 关于我们 | `/about` | `/ko/about` |
| 活动列表 | `/events`（第 2 页起 `/events/page/2`） | `/ko/events` |
| 活动详情 | `/events/2026-09-25` | `/ko/events/2026-09-25` |
| 新生指南 | `/guide` | `/ko/guide` |
| 指南详情 | `/guide/arc-application` | `/ko/guide/arc-application` |
| 合作与赞助 | `/partnership` | `/ko/partnership` |

- 活动详情 URL 由**开始日期自动生成**；同一天多场时第二场起追加序号（`-2`）。
- 指南 URL 由编辑填写英文短名，**发布后不得修改**（会导致外部引用失效）。

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
3. 改 `astro.config.mjs` 里的 `site` 与 `public/robots.txt` 里的 Sitemap 地址为正式域名。

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

### 修改记录与回退

所有改动都是 Git 提交，作者是操作人本人。回退方式：在 GitHub 上找到对应提交，
点 **Revert**，或让开发组执行 `git revert <commit>`。

## 图片规范（PRD 6.2）

- 原图存学联公共邮箱的云盘，按年份与活动分文件夹长期保留；仓库只放压缩后的网页版本。
- 路径：`public/images/{模块}/{年份}/`。
- 除下列例外，一律 **WebP，长边不超过 1600px**：
  - 首页壁纸：桌面 WebP 长边 2400px ≤ 300KB，移动 WebP 长边 1200px ≤ 120KB
  - 成员照片：正方形 800×800 WebP ≤ 80KB
- **每张图必须填写说明文字（alt）**，后台里是必填项。
- 所有图片引用都经过 `src/lib/images.ts`；日后迁移到对象存储只改这一处。
- 当前仓库内的图片是 **SVG 占位图**，上线前需全部替换为真实照片。

## 一期实现说明

**活动状态实时计算。** 状态标签由浏览器在页面打开时按当前时间计算（`src/layouts/Base.astro`
里的脚本），活动列表的分组顺序也在打开时重排。因此即使长期没有重新部署，
过期活动也不会一直显示「即将举行」。

**指南搜索。** 静态站的搜索在浏览器端执行，常见方案按空格分词，中文会搜不到。
本站改为：构建时把标题、摘要与正文输出到 `/guide-index.json`，前端做子串匹配，
中文关键词必定可检索（已验证「登录证」可命中正文）。

**最后更新日期。** 优先取该文件最后一次 Git 提交时间（`scripts/git-updated.mjs` 在构建前生成），
编辑无需填写；构建环境没有 git 历史时回退到 frontmatter 里的 `updated`。对外只显示到月份。

**韩语范围。** 界面文字、首页简介、关于我们、合作与赞助、404 为中韩双语；
活动与新生指南的标题与正文只有中文，韩语界面下显示中文原文，不加任何提示（PRD 3.2）。

## 部署

任选一个支持 Git 自动构建的平台（构建命令 `npm run build`，输出目录 `dist`）：

- **Cloudflare Pages**（推荐：中国大陆访问相对稳定，且与 Cloudflare Web Analytics 同平台）
- Netlify（后台 OAuth 配置最省事）

访问统计：在托管平台加环境变量 `PUBLIC_CF_BEACON_TOKEN`，值为 Cloudflare Web Analytics 的
beacon token，页面会自动带上统计脚本；不设则不加载任何统计代码。

## 上线前必须完成的事项

- [ ] 域名、托管、仓库、后台账号全部归属学联公共邮箱
- [ ] `astro.config.mjs` 的 `site` 与 `robots.txt` 的 Sitemap 改为正式域名
- [ ] 替换全部占位图（壁纸、活动封面、二维码、Logo）
- [ ] 韩语文案由韩语流利的成员通读定稿
- [ ] 关于我们页面的成员逐一取得同意并存档后才填入，勾选「已取得本人同意」
- [ ] 中国大陆访问实测
- [ ] 移动端 4G 首屏渲染 ≤ 3 秒实测
- [ ] `robots.txt` 未屏蔽、`sitemap-index.xml` 可访问

完整验收清单见《维护手册》`docs/维护手册.md`。
