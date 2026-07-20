<!-- src/components/TopNav.svelte — Minimal top navigation -->
<script>
  import ThemeToggle from './ThemeToggle.svelte';

  export let activeTab = 'home';

  let mobileOpen = false;

  const tabs = [
    { id: 'home',     label: 'Home' },
    { id: 'news',     label: 'News' },
    { id: 'work',     label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'team',     label: 'Team' },
    // { id: 'blog',     label: 'Blog' },
  ];

  function select(id) {
    activeTab = id;
    mobileOpen = false;
  }
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--nav-height);
    background: var(--nav-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--nav-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    z-index: 200;
  }

  .brand {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 4px;
    color: var(--nav-text);
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
  }

  .brand:hover { color: var(--nav-text-active); }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.1rem;
  }

  .nav-link {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 2px;
    color: var(--nav-text);
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.4rem 0.8rem;
    transition: color 0.2s;
    border-radius: var(--radius);
  }

  .nav-link:hover   { color: var(--nav-text-hover); }
  .nav-link.active  { color: var(--nav-text-active); }

  /* Mobile */
  .hamburger {
    display: none;
    background: none;
    border: 1px solid var(--nav-control-border);
    color: var(--nav-text-active);
    font-size: 1rem;
    line-height: 1;
    padding: 0.35rem 0.55rem;
    cursor: pointer;
    border-radius: var(--radius);
    transition: border-color 0.2s, color 0.2s;
  }

  .hamburger:hover {
    border-color: var(--color-primary-light);
    color: var(--nav-text-active);
  }

  .mobile-menu {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: var(--nav-menu-bg);
    border-bottom: 1px solid var(--nav-border);
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    z-index: 199;
  }

  .mobile-link {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 2px;
    color: var(--nav-text);
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.65rem 1rem;
    text-align: left;
    transition: color 0.2s;
    border-radius: var(--radius);
  }

  .mobile-link:hover  { color: var(--nav-text-hover); }
  .mobile-link.active { color: var(--nav-text-active); }

  @media (max-width: 640px) {
    .nav-links  { display: none; }
    .hamburger  { display: block; }
  }
</style>

<nav>
  <button class="brand" on:click={() => select('home')}>QTLAB.DEV</button>

  <div class="nav-actions">
    <div class="nav-links">
      {#each tabs as tab (tab.id)}
        <button
          class="nav-link"
          class:active={activeTab === tab.id}
          on:click={() => select(tab.id)}
        >{tab.label}</button>
      {/each}
    </div>

    <ThemeToggle />

    <button
      class="hamburger"
      on:click={() => (mobileOpen = !mobileOpen)}
      aria-label="Toggle menu"
    >{mobileOpen ? '✕' : '☰'}</button>
  </div>
</nav>

{#if mobileOpen}
  <div class="mobile-menu">
    {#each tabs as tab (tab.id)}
      <button
        class="mobile-link"
        class:active={activeTab === tab.id}
        on:click={() => select(tab.id)}
      >{tab.label}</button>
    {/each}
  </div>
{/if}
