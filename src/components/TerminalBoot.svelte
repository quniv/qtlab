<script>
  import { onMount } from 'svelte';
  import { bootSequence } from '../data/boot.js';

  let terminalText = '';

  onMount(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < bootSequence.length) {
        terminalText += bootSequence[i] + '\n';
        i++;
        setTimeout(typeWriter, 800);
      }
    };
    setTimeout(typeWriter, 1000);
  });
</script>

<style>
  .terminal-boot {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 5, 20, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(167, 139, 250, 0.4);
    padding: 16px 20px;
    font-size: 12px;
    font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
    max-width: 300px;
    white-space: pre-line;
    border-radius: 2px;
    box-shadow:
      0 0 20px rgba(167, 139, 250, 0.15),
      0 0 40px rgba(167, 139, 250, 0.04),
      inset 0 0 20px rgba(167, 139, 250, 0.03);
    color: #a78bfa;
    z-index: 100;
  }
</style>

{#if terminalText}
  <div class="terminal-boot">{terminalText}</div>
{/if}
