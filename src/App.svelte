<!-- src/App.svelte — Root layout -->
<script>
  import TopNav from './components/TopNav.svelte';
  import Home from './pages/Home.svelte';
  import Work from './pages/Work.svelte';
  import Services from './pages/Services.svelte';
  import Team from './pages/Team.svelte';
  import News from './pages/News.svelte';

  let activeTab = 'home';
</script>

<style>
  .content {
    padding-top: var(--nav-height);
    min-height: 100vh;
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
  {:else if activeTab === 'news'}
    <News />
  {/if}
</div>
