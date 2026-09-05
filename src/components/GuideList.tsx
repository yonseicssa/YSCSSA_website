'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Icon from './Icon';
import { localePath, t, type Lang } from '@/i18n/ui';

export type GuideListItem = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  monthLabel: string;
};

type IndexItem = { slug: string; title: string; summary: string; text: string };

export default function GuideList({ items, lang }: { items: GuideListItem[]; lang: Lang }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<IndexItem[] | null>(null);

  // 索引只在第一次输入时按需加载
  useEffect(() => {
    if (query.trim() === '' || index) return;
    let cancelled = false;
    fetch('/guide-index.json')
      .then((response) => response.json())
      .then((data: IndexItem[]) => {
        if (!cancelled) setIndex(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [query, index]);

  const visible = useMemo(() => {
    const keywords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (keywords.length === 0) return items;
    if (!index) return items;

    // 子串匹配，不依赖分词：搜索「登录证」一定能命中正文中的「登录证」
    const matched = new Set(
      index
        .filter((entry) => {
          const haystack = `${entry.title} ${entry.summary} ${entry.text}`.toLowerCase();
          return keywords.every((keyword) => haystack.includes(keyword));
        })
        .map((entry) => entry.slug)
    );
    return items.filter((item) => matched.has(item.slug));
  }, [items, index, query]);

  return (
    <>
      <form className="guide-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="visually-hidden" htmlFor="guide-search-input">
          {t(lang, 'guide.search')}
        </label>
        <Icon name="search" />
        <input
          id="guide-search-input"
          type="search"
          autoComplete="off"
          placeholder={t(lang, 'guide.searchPlaceholder')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>

      {items.length === 0 ? (
        <p className="empty-state">{t(lang, 'guide.empty')}</p>
      ) : (
        <ul className="guide-list">
          {visible.map((item) => (
            <li className="guide-item" key={item.slug}>
              <Link href={localePath(lang, `/guide/${item.slug}`)}>
                <span className="guide-date">
                  <span className="visually-hidden">{t(lang, 'guide.updated')}</span>
                  <span className="guide-date-year">{item.year}</span>
                  <span className="guide-date-month">{item.monthLabel}</span>
                </span>

                <span className="guide-body">
                  <span className="guide-title">{item.title}</span>
                  <span className="guide-summary">{item.summary}</span>
                </span>

                <Icon name="arrow-forward" className="guide-go" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {visible.length === 0 && items.length > 0 && <p className="empty-state">{t(lang, 'guide.noResult')}</p>}
    </>
  );
}
