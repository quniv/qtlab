<script>
  import { onMount } from 'svelte';

  const lines = [
    '> Initializing news feed...',
    '> Connecting to data stream...',
    '> [PENDING] Daily news — coming soon',
    '> [PENDING] Announcements — coming soon',
    '> Stand by.',
  ];

  let visibleLines = [];

  onMount(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        visibleLines = [...visibleLines, line];
      }, i * 600);
    });
  });
</script>

<style>
  .news-page {
    padding: 2rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .news-terminal {
    background: rgba(5, 3, 20, 0.88);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(167, 139, 250, 0.3);
    border-radius: 4px;
    box-shadow:
      0 0 30px rgba(167, 139, 250, 0.1),
      inset 0 0 20px rgba(167, 139, 250, 0.03);
    overflow: hidden;
  }

  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.75rem 1rem;
    background: rgba(167, 139, 250, 0.05);
    border-bottom: 1px solid rgba(167, 139, 250, 0.15);
  }

  .t-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .t-dot.red    { background: #f472b6; box-shadow: 0 0 6px rgba(255, 0, 110, 0.7); }
  .t-dot.yellow { background: #fbbf24; box-shadow: 0 0 6px rgba(247, 255, 0, 0.7); }
  .t-dot.green  { background: #a78bfa; box-shadow: 0 0 6px rgba(167, 139, 250, 0.7); }

  .terminal-label {
    margin-left: 0.5rem;
    color: #a78bfa;
    font-family: 'JetBrains Mono', 'SF Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  .terminal-body {
    padding: 2rem;
    font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
    font-size: 0.9rem;
    min-height: 260px;
  }

  .terminal-line {
    color: #a78bfa;
    line-height: 2;
    animation: fadeIn 0.3s ease-out;
    white-space: pre;
  }

  .terminal-line.pending {
    color: #9d8ec4;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .cursor-line {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }

  .blink-cursor {
    display: inline-block;
    width: 8px;
    height: 1.1em;
    background: #a78bfa;
    box-shadow: 0 0 8px rgba(167, 139, 250, 0.8);
    animation: cursorBlink 0.9s step-end infinite;
    vertical-align: middle;
  }

  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .news-header {
    margin-bottom: 2rem;
  }

  .news-header h1 {
    color: #f0ecff;
    font-size: 1.6rem;
    font-weight: 300;
    letter-spacing: 6px;
    text-transform: uppercase;
    margin: 0 0 0.4rem;
    font-family: 'JetBrains Mono', monospace;
    text-shadow: 0 0 20px rgba(167, 139, 250, 0.25);
  }

  .news-header .subtitle {
    color: #a78bfa;
    font-size: 0.8rem;
    letter-spacing: 3px;
    opacity: 0.7;
    font-family: 'JetBrains Mono', monospace;
  }
</style>

<div class="news-page">
  <div class="news-header">
    <h1>News</h1>
    <div class="subtitle">// feed.log</div>
  </div>

  <div class="news-terminal">
    <div class="terminal-bar">
      <div class="t-dot red"></div>
      <div class="t-dot yellow"></div>
      <div class="t-dot green"></div>
      <span class="terminal-label">~/qitpy/news.feed</span>
    </div>
    <div class="terminal-body">
      {#each visibleLines as line (line)}
        <div class="terminal-line" class:pending={line.includes('[PENDING]')}>{line}</div>
      {/each}
      <div class="cursor-line">
        <span class="blink-cursor"></span>
      </div>
    </div>
  </div>
</div>
