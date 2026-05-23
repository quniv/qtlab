<!-- src/pages/AboutMe.svelte — Beatless Theme -->
<script>
  import { mount, unmount } from 'svelte';
  import CV from '../CV.svelte';
  import TerminalBoot from '../components/TerminalBoot.svelte';
  import GameOfLife from '../components/GameOfLife.svelte';
  import MotivationSection from '../components/MotivationSection.svelte';
  import HangingScroll from '../components/HangingScroll.svelte';

  let isGeneratingCV = false;
  let cvError = '';

  async function downloadCV() {
    if (isGeneratingCV) return;
    isGeneratingCV = true;
    cvError = '';

    const tempEl = document.createElement('div');
    tempEl.className = 'pdf-export';
    Object.assign(tempEl.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '0',
      pointerEvents: 'none',
      zIndex: '-9999',
    });
    document.body.appendChild(tempEl);
    const cvInstance = mount(CV, { target: tempEl });

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const now = new Date();
      const today = now.toISOString().slice(0, 10).replace(/-/g, '');
      const time = now.toTimeString().slice(0, 8).replace(/:/g, '');
      await html2pdf()
        .set({
          margin: [64, 0, 64, 0],
          filename: `QuyetDoan_DevOps_CV_${today}_${time}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false, width: 794 },
          jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' },
          enableLinks: true,
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        })
        .from(tempEl.firstElementChild)
        .save();
    } catch (err) {
      cvError = 'Failed to generate CV. Please try again.';
      console.error(err);
    } finally {
      unmount(cvInstance);
      document.body.removeChild(tempEl);
      isGeneratingCV = false;
    }
  }
</script>

<style>
  /* ── Header ── */
  header {
    background: linear-gradient(180deg, rgba(0, 5, 20, 0.98) 0%, rgba(5, 5, 25, 0.95) 100%);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 245, 255, 0.2);
    padding: 4rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00f5ff, #ff006e, #00f5ff, transparent);
    background-size: 200% 100%;
    animation: shimmer 4s linear infinite;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .main-quote {
    color: #c0c8e8;
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 300;
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.8;
    letter-spacing: 0.5px;
  }

  /* ── Main ── */
  main {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ── Profile Section ── */
  .profile-section {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
    align-items: start;
  }

  .profile-card {
    background: rgba(0, 5, 20, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 245, 255, 0.25);
    padding: 2.5rem 2rem;
    text-align: center;
    border-radius: 4px;
    box-shadow:
      0 0 20px rgba(0, 245, 255, 0.08),
      inset 0 0 20px rgba(0, 245, 255, 0.02);
    transition: all 0.4s ease;
  }

  .profile-card:hover {
    box-shadow:
      0 0 30px rgba(0, 245, 255, 0.2),
      0 0 60px rgba(0, 245, 255, 0.06),
      inset 0 0 20px rgba(0, 245, 255, 0.04);
    transform: translateY(-4px);
    border-color: rgba(0, 245, 255, 0.5);
  }

  img.profile {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid rgba(0, 245, 255, 0.4);
    margin-bottom: 1.2rem;
    transition: all 0.4s ease;
    box-shadow: 0 0 20px rgba(0, 245, 255, 0.2);
    object-fit: cover;
  }

  img.profile:hover {
    transform: scale(1.08);
    border-color: #00f5ff;
    box-shadow: 0 0 30px rgba(0, 245, 255, 0.4), 0 0 60px rgba(0, 245, 255, 0.1);
  }

  .name {
    font-size: 1.5rem;
    font-weight: 600;
    color: #e0e8ff;
    margin: 1rem 0 0.5rem;
    letter-spacing: 1px;
  }

  .role {
    color: #00f5ff;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-shadow: 0 0 8px rgba(0, 245, 255, 0.5);
  }

  /* ── Bio Section ── */
  .bio-section {
    background: rgba(0, 5, 20, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 245, 255, 0.2);
    padding: 2.5rem;
    line-height: 1.8;
    border-radius: 4px;
    box-shadow:
      0 0 20px rgba(0, 245, 255, 0.06),
      inset 0 0 20px rgba(0, 245, 255, 0.02);
    position: relative;
  }

  .bio-section::before {
    content: 'ABOUT';
    position: absolute;
    top: -10px;
    left: 24px;
    background: #050510;
    padding: 2px 12px;
    color: #00f5ff;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 3px;
    border-radius: 2px;
    font-family: 'JetBrains Mono', monospace;
  }

  .bio-section p {
    margin-bottom: 1rem;
    color: #8892b0;
    font-weight: 400;
  }

  /* ── Footer ── */
  footer {
    background: rgba(0, 5, 20, 0.95);
    backdrop-filter: blur(16px);
    border-top: 1px solid rgba(0, 245, 255, 0.15);
    color: #6070a0;
    text-align: center;
    padding: 2rem;
    margin-top: 3rem;
    position: relative;
  }

  footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00f5ff, #ff006e, #00f5ff, transparent);
    background-size: 200% 100%;
    animation: shimmer 4s linear infinite;
  }

  footer p {
    font-weight: 400;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }

  .cv-download-btn {
    display: inline-block;
    margin-bottom: 1.2rem;
    padding: 0.7rem 2rem;
    background: transparent;
    color: #00f5ff;
    text-decoration: none;
    border: none;
    border-radius: 0;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 2px;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    box-shadow: 0 0 12px rgba(0, 245, 255, 0.2), inset 0 0 0 1px rgba(0, 245, 255, 0.4);
    font-family: 'JetBrains Mono', monospace;
    text-transform: uppercase;
    cursor: pointer;
  }

  .cv-download-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .cv-download-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 25px rgba(0, 245, 255, 0.4), inset 0 0 0 1px #00f5ff;
    background: rgba(0, 245, 255, 0.08);
  }

  .cv-error {
    color: #ff006e;
    font-size: 0.8rem;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 8px rgba(255, 0, 110, 0.4);
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .profile-section {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    main {
      padding: 1rem;
    }
  }
</style>

<TerminalBoot />

<header>
  <div class="main-quote">"Bound by journey, blessed by luck."</div>
</header>

<main>
  <div class="profile-section">
    <div class="profile-card">
      <img src="images/avatar_022025.jpeg" alt="Quyet Doan" class="profile" />
      <div class="name">Quyet Doan</div>
      <div class="role">DevSecOps Engineer</div>
    </div>

    <div class="bio-section">
      <p>👤</p>
      <p>Not a pro — becoming one.</p>
      <p>A realist and a dreamer.</p>
    </div>
  </div>

  <GameOfLife />
  <MotivationSection />
  <HangingScroll />
</main>

<footer>
  <button class="cv-download-btn" on:click={downloadCV} disabled={isGeneratingCV}>
    {isGeneratingCV ? '⏳ Generating...' : '↓ Download CV'}
  </button>
  {#if cvError}
    <p class="cv-error">{cvError}</p>
  {/if}
  <p>© 2024 🤖🔗🍀 · Analog Hack 🤍</p>
</footer>
