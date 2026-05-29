<!-- src/App.svelte — Root layout -->
<script>
  import Sidebar from './components/Sidebar.svelte';
  import Starfield from './components/Starfield.svelte';
  import News from './pages/News.svelte';
  import AboutMe from './pages/AboutMe.svelte';

  let activeTab = 'news';
</script>

<style>
  /* ═══════════════════════════════════════════
     UNIVERSE THEME — Global Body Styles
     ═══════════════════════════════════════════ */

  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin: 0;
    padding: 0;
    background: #030308;
    color: #e2d9f3;
    overflow-x: hidden;
    min-height: 100vh;
    position: relative;
  }

  /* Nebula cloud overlay */
  :global(body::before) {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 50% at 20% 20%, rgba(120, 60, 200, 0.13) 0%, transparent 60%),
      radial-gradient(ellipse 55% 40% at 82% 85%, rgba(251, 191, 36, 0.08) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 85% 25%, rgba(96, 165, 250, 0.09) 0%, transparent 55%),
      radial-gradient(ellipse 45% 55% at 12% 75%, rgba(244, 114, 182, 0.08) 0%, transparent 55%),
      radial-gradient(ellipse 90% 80% at 50% 50%, rgba(40, 15, 80, 0.22) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  :global(*) {
    position: relative;
    z-index: 1;
  }

  /* ── Layout shell ── */
  .app-shell {
    display: flex;
    min-height: 100vh;
  }

  /* Offset for the fixed 220px sidebar */
  .content-area {
    margin-left: 220px;
    flex: 1;
    min-width: 0;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .content-area {
      margin-left: 0;
    }
  }
</style>

<Starfield />

<div class="app-shell">
  <Sidebar bind:activeTab />

  <div class="content-area">
    {#if activeTab === 'news'}
      <News />
    {:else if activeTab === 'aboutme'}
      <AboutMe />
    {/if}
  </div>
</div>
