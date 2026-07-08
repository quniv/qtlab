<!-- src/App.svelte — Root layout -->
<script>
  import TopNav from './components/TopNav.svelte';
  import Home from './pages/Home.svelte';
  import Work from './pages/Work.svelte';
  import Services from './pages/Services.svelte';
  import Team from './pages/Team.svelte';
  import Blog from './pages/Blog.svelte';
  import News from './pages/News.svelte';

  let activeTab = 'home';
</script>

<style>
  :global(:root) {
    --bg:             #0a0a0a;
    --surface:        #111111;
    --surface-2:      #181818;
    --border:         rgba(255, 255, 255, 0.07);
    --border-active:  rgba(255, 255, 255, 0.18);

    --text-primary:   #efefef;
    --text-secondary: #aaaaaa;
    --text-muted:     #666666;

    --accent:         #ffffff;
    --blue:           #3b82f6;

    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;

    --nav-height: 56px;
    --radius:     3px;

    /* compat shims for TechStack & other components */
    --border-subtle:   var(--border);
    --radius-md:       var(--radius);
    --accent-faint:    rgba(255, 255, 255, 0.03);
    --accent-faint-md: rgba(255, 255, 255, 0.06);
    --accent-dim:      var(--text-muted);
  }

  :global(body) {
    font-family: var(--font-body);
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--text-primary);
    overflow-x: hidden;
    min-height: 100vh;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .content {
    padding-top: var(--nav-height);
  }
</style>

<TopNav bind:activeTab />

<div class="content">
  {#if activeTab === 'home'}
    <Home onNavigate={(id) => { activeTab = id; }} />
  {:else if activeTab === 'work'}
    <Work />
  {:else if activeTab === 'services'}
    <Services />
  {:else if activeTab === 'team'}
    <Team />
  {:else if activeTab === 'blog'}
    <Blog />
  {:else if activeTab === 'news'}
    <News />
  {/if}
</div>
