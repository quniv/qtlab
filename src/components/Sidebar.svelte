<script>
  export let activeTab = 'news';

  let mobileOpen = false;

  const tabs = [
    { id: 'news', label: 'News', icon: '📰' },
  ];

  function selectTab(id) {
    activeTab = id;
    mobileOpen = false;
  }

  function toggleMobile() {
    mobileOpen = !mobileOpen;
  }
</script>

<style>
  /* ── Hamburger (mobile only) ── */
  .hamburger {
    display: none;
    position: fixed;
    top: 14px;
    left: 14px;
    z-index: 300;
    background: rgba(5, 3, 20, 0.95);
    border: 1px solid rgba(167, 139, 250, 0.4);
    color: #a78bfa;
    font-size: 1.2rem;
    line-height: 1;
    padding: 0.4rem 0.6rem;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s;
  }

  .hamburger:hover {
    background: rgba(167, 139, 250, 0.1);
    box-shadow: 0 0 12px rgba(167, 139, 250, 0.3);
  }

  /* ── Sidebar ── */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    background: rgba(5, 3, 20, 0.98);
    border-right: 1px solid rgba(167, 139, 250, 0.25);
    display: flex;
    flex-direction: column;
    z-index: 200;
    box-shadow: 4px 0 24px rgba(167, 139, 250, 0.06);
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ── Logo / Title ── */
  .sidebar-logo {
    padding: 1.8rem 1.5rem 1.4rem;
    border-bottom: 1px solid rgba(167, 139, 250, 0.12);
  }

  .pickle-icon {
    font-size: 2.2rem;
    display: block;
    text-align: center;
    animation: pickleFloat 3s ease-in-out infinite;
    cursor: pointer;
    user-select: none;
    background: none;
    border: none;
    padding: 0;
    width: 100%;
  }

  @keyframes pickleFloat {
    0%, 100% { transform: rotate(-8deg) translateY(0); }
    50%       { transform: rotate(8deg) translateY(-4px); }
  }

  /* ── Nav ── */
  nav {
    flex: 1;
    padding: 1.2rem 0;
    overflow-y: auto;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    color: #9d8ec4;
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.5px;
    position: relative;
    transition: color 0.2s ease, background 0.2s ease;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    border-left: 3px solid transparent;
  }

  .nav-item:hover {
    color: #c0c8e8;
    background: rgba(167, 139, 250, 0.05);
  }

  .nav-item.active {
    color: #a78bfa;
    background: rgba(167, 139, 250, 0.07);
    border-left-color: #a78bfa;
    text-shadow: 0 0 8px rgba(167, 139, 250, 0.4);
  }

  .nav-icon {
    font-size: 1rem;
    flex-shrink: 0;
    width: 20px;
    text-align: center;
  }

  /* ── Footer strip ── */
  .sidebar-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(167, 139, 250, 0.1);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    color: #4a4070;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .footer-icon-btn {
    background: none;
    border: 1px solid rgba(167, 139, 250, 0.2);
    border-radius: 4px;
    color: #9d8ec4;
    font-size: 1rem;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
    flex-shrink: 0;
  }

  .footer-icon-btn:hover {
    color: #c0c8e8;
    border-color: rgba(167, 139, 250, 0.4);
    background: rgba(167, 139, 250, 0.06);
  }

  .footer-icon-btn.active {
    color: #a78bfa;
    border-color: #a78bfa;
    background: rgba(167, 139, 250, 0.08);
    box-shadow: 0 0 8px rgba(167, 139, 250, 0.25);
  }

  /* ── Mobile overlay backdrop ── */
  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 199;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .hamburger {
      display: block;
    }

    .sidebar {
      transform: translateX(-100%);
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .backdrop {
      display: block;
    }
  }
</style>

<!-- Mobile hamburger -->
<button class="hamburger" on:click={toggleMobile} aria-label="Toggle menu">
  {mobileOpen ? '✕' : '☰'}
</button>

<!-- Backdrop (mobile) -->
{#if mobileOpen}
  <div class="backdrop" on:click={toggleMobile} role="presentation"></div>
{/if}

<aside class="sidebar" class:open={mobileOpen}>
  <div class="sidebar-logo">
    <button class="pickle-icon" on:click={() => selectTab('news')} title="Home">🥒</button>
  </div>

  <nav>
    {#each tabs as tab (tab.id)}
      <button
        class="nav-item"
        class:active={activeTab === tab.id}
        on:click={() => selectTab(tab.id)}
      >
        <span class="nav-icon">{tab.icon}</span>
        {tab.label}
      </button>
    {/each}
  </nav>

  <div class="sidebar-footer">
    <button
      class="footer-icon-btn"
      class:active={activeTab === 'aboutme'}
      on:click={() => selectTab('aboutme')}
      title="About Me"
    >👤</button>
    <span>v0.1.0</span>
  </div>
</aside>
