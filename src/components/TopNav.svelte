<!-- src/components/TopNav.svelte — Minimal top navigation -->
<script>
  export let activeTab = 'home';

  let mobileOpen = false;

  const tabs = [
    { id: 'home',     label: 'Home' },
    { id: 'work',     label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'team',     label: 'Team' },
    { id: 'blog',     label: 'Blog' },
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
    background: rgba(10, 10, 10, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
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
    color: var(--text-muted);
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
  }

  .brand:hover { color: var(--text-secondary); }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.1rem;
  }

  .nav-link {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 2px;
    color: var(--text-muted);
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.4rem 0.8rem;
    transition: color 0.2s;
    border-radius: var(--radius);
  }

  .nav-link:hover   { color: var(--text-secondary); }
  .nav-link.active  { color: var(--text-primary); }

  /* Mobile */
  .hamburger {
    display: none;
    background: none;
    border: 1px solid var(--border-active);
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1;
    padding: 0.35rem 0.55rem;
    cursor: pointer;
    border-radius: var(--radius);
    transition: border-color 0.2s, color 0.2s;
  }

  .hamburger:hover {
    border-color: var(--accent);
    color: var(--text-primary);
  }

  .mobile-menu {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: #0a0a0a;
    border-bottom: 1px solid var(--border);
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
    color: var(--text-muted);
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.65rem 1rem;
    text-align: left;
    transition: color 0.2s;
    border-radius: var(--radius);
  }

  .mobile-link:hover  { color: var(--text-secondary); }
  .mobile-link.active { color: var(--text-primary); }

  @media (max-width: 640px) {
    .nav-links  { display: none; }
    .hamburger  { display: block; }
  }
</style>

<nav>
  <button class="brand" on:click={() => select('home')}>QTLAB.DEV</button>

  <div class="nav-links">
    {#each tabs as tab (tab.id)}
      <button
        class="nav-link"
        class:active={activeTab === tab.id}
        on:click={() => select(tab.id)}
      >{tab.label}</button>
    {/each}
  </div>

  <button
    class="hamburger"
    on:click={() => (mobileOpen = !mobileOpen)}
    aria-label="Toggle menu"
  >{mobileOpen ? '✕' : '☰'}</button>
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
