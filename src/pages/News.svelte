<!-- src/pages/News.svelte — Daily digest fed by quniv/veen-news (static JSON, no backend) -->
<script>
  import { onMount } from 'svelte';

  const FEED_URL = 'https://cdn.jsdelivr.net/gh/quniv/veen-news@main/data/latest.json';

  const CATEGORY_ORDER = [
    'technology',
    'ai',
    'devops',
    'world',
    'vietnam',
    'innovations',
    'robotics',
    'open_source',
  ];

  const CATEGORY_LABELS = {
    technology: 'Technology',
    ai: 'AI',
    devops: 'DevOps',
    world: 'World',
    vietnam: 'Vietnam',
    innovations: 'Innovations',
    robotics: 'Robotics',
    open_source: 'Open Source',
  };

  let status = 'loading'; // 'loading' | 'error' | 'loaded'
  let errorMessage = '';
  let digest = null;
  let availableCategories = [];
  let selectedCategory = 'all';
  let showCursor = true;

  $: visibleArticles = digest
    ? selectedCategory === 'all'
      ? CATEGORY_ORDER.flatMap((cat) => digest.categories[cat] ?? [])
      : digest.categories[selectedCategory] ?? []
    : [];

  function selectCategory(id) {
    selectedCategory = id;
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  async function loadFeed() {
    status = 'loading';
    errorMessage = '';
    try {
      const res = await fetch(FEED_URL, { cache: 'no-cache' });
      if (!res.ok) {
        throw new Error(`Feed responded with ${res.status}`);
      }
      const data = await res.json();
      digest = data;
      availableCategories = CATEGORY_ORDER.filter(
        (cat) => (data.categories?.[cat]?.length ?? 0) > 0
      );
      selectedCategory = 'all';
      status = 'loaded';
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : 'Unknown error';
      status = 'error';
    }
  }

  onMount(() => {
    loadFeed();
    const id = setInterval(() => {
      showCursor = !showCursor;
    }, 530);
    return () => clearInterval(id);
  });
</script>

<style>
  .page-header {
    padding: 3.5rem 2rem 2.5rem;
    border-bottom: 1px solid var(--border);
    max-width: 1100px;
    margin: 0 auto;
  }

  .page-label {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 4px;
    color: var(--text-muted);
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .page-title {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.5px;
    margin: 0 0 0.6rem;
    line-height: 1.1;
  }

  .page-subhead {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  main {
    padding: 2.5rem 2rem 4rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Loading terminal ── */
  .terminal-wrap {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1rem;
    background: var(--surface-2);
    border-bottom: 1px solid var(--border);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--border-active);
  }

  .terminal-title {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 2px;
    margin-left: 0.5rem;
    text-transform: uppercase;
  }

  .terminal-body {
    padding: 1.5rem;
    min-height: 160px;
  }

  .terminal-line {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-secondary);
    line-height: 1.9;
  }

  .cursor-line {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-muted);
    padding-top: 0.8rem;
    letter-spacing: 1px;
    opacity: 0.5;
  }

  .cursor {
    display: inline-block;
    width: 7px;
    height: 0.9em;
    background: var(--text-muted);
    vertical-align: text-bottom;
    margin-left: 2px;
    opacity: 0;
    transition: opacity 0.1s;
  }

  .cursor.visible {
    opacity: 1;
  }

  /* ── Error state ── */
  .error-box {
    border: 1px solid var(--border-active);
    border-radius: var(--radius);
    padding: 1.75rem;
    background: var(--surface);
  }

  .error-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 1.5px;
    color: #f87171;
    text-transform: uppercase;
    margin: 0 0 0.6rem;
  }

  .error-message {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0 0 1.25rem;
  }

  .retry-button {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 1.5px;
    padding: 0.5rem 1.1rem;
    background: transparent;
    border: 1px solid var(--border-active);
    color: var(--text-secondary);
    cursor: pointer;
    border-radius: var(--radius);
    text-transform: uppercase;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
  }

  .retry-button:hover {
    color: var(--text-primary);
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.04);
  }

  /* ── Category pills ── */
  .category-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .category-pill {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 1.5px;
    padding: 0.4rem 0.85rem;
    border-radius: var(--radius);
    text-transform: uppercase;
    border: 1px solid var(--border-active);
    color: var(--text-muted);
    background: transparent;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
  }

  .category-pill:hover {
    color: var(--text-secondary);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .category-pill.active {
    color: var(--text-primary);
    border-color: var(--accent);
    background: rgba(255, 255, 255, 0.06);
  }

  /* ── Article grid ── */
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .article-card {
    background: var(--bg);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    transition: background 0.2s;
  }

  .article-card:hover {
    background: var(--surface);
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  .article-category {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 1px;
    padding: 0.18rem 0.5rem;
    border-radius: var(--radius);
    text-transform: uppercase;
    border: 1px solid var(--border-active);
    color: var(--text-muted);
  }

  .article-source {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  .article-title {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.4;
    text-decoration: none;
  }

  .article-title:hover {
    color: var(--blue);
  }

  .article-summary {
    font-size: 0.84rem;
    color: var(--text-muted);
    line-height: 1.72;
    margin: 0;
    flex: 1;
  }

  .article-date {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  .empty-state {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
    padding: 2rem;
    text-align: center;
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  @media (max-width: 768px) {
    .page-header {
      padding: 2.5rem 1.25rem 2rem;
    }
    main {
      padding: 2rem 1.25rem 3rem;
    }
    .articles-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="page-header">
  <div class="page-label">// News</div>
  <h1 class="page-title">Daily Digest</h1>
  {#if status === 'loaded' && digest}
    <div class="page-subhead">
      {digest.date} · generated {formatDate(digest.generated_at)}
    </div>
  {:else}
    <div class="page-subhead">// feed.log</div>
  {/if}
</div>

<main>
  {#if status === 'loading'}
    <div class="terminal-wrap">
      <div class="terminal-bar">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <span class="terminal-title">veen-news · latest.json</span>
      </div>
      <div class="terminal-body">
        <div class="terminal-line">&gt; Fetching latest digest...</div>
        <div class="terminal-line">&gt; Connecting to cdn.jsdelivr.net...</div>
        <div class="cursor-line">
          &nbsp;<span class="cursor" class:visible={showCursor}></span>
        </div>
      </div>
    </div>
  {:else if status === 'error'}
    <div class="error-box">
      <p class="error-title">Feed unavailable</p>
      <p class="error-message">
        Couldn't load the news digest ({errorMessage}). The feed may be
        temporarily down or your connection may be offline.
      </p>
      <button class="retry-button" on:click={loadFeed}>Retry</button>
    </div>
  {:else if status === 'loaded' && digest}
    {#if availableCategories.length > 0}
      <div class="category-row">
        <button
          class="category-pill"
          class:active={selectedCategory === 'all'}
          on:click={() => selectCategory('all')}
        >All</button>
        {#each availableCategories as cat (cat)}
          <button
            class="category-pill"
            class:active={selectedCategory === cat}
            on:click={() => selectCategory(cat)}
          >{CATEGORY_LABELS[cat] ?? cat}</button>
        {/each}
      </div>
    {/if}

    {#if visibleArticles.length > 0}
      <div class="articles-grid">
        {#each visibleArticles as article (article.id)}
          <div class="article-card">
            <div class="card-meta">
              <span class="article-category">{CATEGORY_LABELS[article.category] ?? article.category}</span>
              <span class="article-source">{article.source}</span>
            </div>
            <a
              class="article-title"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >{article.title}</a>
            <p class="article-summary">{article.summary}</p>
            <span class="article-date">{formatDate(article.published_at)}</span>
          </div>
        {/each}
      </div>
    {:else}
      <div class="empty-state">No articles in today's digest yet. Check back soon.</div>
    {/if}
  {/if}
</main>
