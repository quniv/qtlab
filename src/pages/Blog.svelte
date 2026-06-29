<!-- src/pages/Blog.svelte — Lab notes + blog feed -->
<script>
  import { labNotes } from '../orgData.js';
  import { onMount } from 'svelte';

  const published = labNotes.filter(n => n.status === 'published');

  const pendingLines = [
    '> [QTLAB.DEV] Booting blog engine...',
    '> [QTLAB.DEV] Scanning lab notes...',
    '> [PENDING] Lab notes — coming soon',
    '> [PENDING] Blog posts — coming soon',
    '> Stand by.',
  ];

  let visibleLines = [];
  let showCursor = true;

  onMount(() => {
    if (published.length === 0) {
      pendingLines.forEach((line, i) => {
        setTimeout(() => {
          visibleLines = [...visibleLines, line];
        }, i * 600);
      });
    }

    const id = setInterval(() => { showCursor = !showCursor; }, 530);
    return () => clearInterval(id);
  });

  const typeLabel = { lab: 'LAB', blog: 'BLOG' };
</script>

<style>
  .page-header {
    padding: 3.5rem 2rem 2.5rem;
    border-bottom: 1px solid var(--border);
    max-width: 900px;
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
    margin: 0;
    line-height: 1.1;
  }

  main {
    padding: 2.5rem 2rem 4rem;
    max-width: 900px;
    margin: 0 auto;
  }

  /* ── Terminal ── */
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
    white-space: pre;
  }

  .terminal-line.pending { color: var(--text-muted); }

  /* ── Published posts ── */
  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 2rem;
  }

  .post-card {
    background: var(--bg);
    padding: 1.6rem 1.75rem;
    transition: background 0.2s;
  }

  .post-card:hover { background: var(--surface); }

  .post-meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.65rem;
    flex-wrap: wrap;
  }

  .post-date {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 1px;
  }

  .post-type {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 1.5px;
    padding: 0.12rem 0.45rem;
    border-radius: var(--radius);
    color: var(--text-secondary);
    border: 1px solid var(--border-active);
  }

  .post-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem;
    letter-spacing: 0.2px;
    line-height: 1.4;
  }

  .post-excerpt {
    font-size: 0.84rem;
    color: var(--text-muted);
    line-height: 1.72;
    margin: 0 0 0.9rem;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .post-tag {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.1rem 0.4rem;
    letter-spacing: 0.5px;
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

  .cursor.visible { opacity: 1; }

  @media (max-width: 768px) {
    .page-header { padding: 2.5rem 1.25rem 2rem; }
    main { padding: 2rem 1.25rem 3rem; }
  }
</style>

<div class="page-header">
  <div class="page-label">// Blog</div>
  <h1 class="page-title">Lab Notes</h1>
</div>

<main>
  {#if published.length === 0}
    <div class="terminal-wrap">
      <div class="terminal-bar">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <span class="terminal-title">Blog & Lab Notes</span>
      </div>
      <div class="terminal-body">
        {#each visibleLines as line, i (i)}
          <div class="terminal-line" class:pending={line.includes('[PENDING]')}>{line}</div>
        {/each}
        <div class="cursor-line">
          &nbsp;<span class="cursor" class:visible={showCursor}></span>
        </div>
      </div>
    </div>
  {:else}
    <div class="posts-list">
      {#each published as post (post.id)}
        <div class="post-card">
          <div class="post-meta">
            <span class="post-date">{post.date}</span>
            <span class="post-type">{typeLabel[post.type] ?? post.type.toUpperCase()}</span>
          </div>
          <h3 class="post-title">{post.title}</h3>
          <p class="post-excerpt">{post.excerpt}</p>
          <div class="post-tags">
            {#each post.tags as t (t)}
              <span class="post-tag">{t}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="cursor-line">
      > loading more...<span class="cursor" class:visible={showCursor}></span>
    </div>
  {/if}
</main>
