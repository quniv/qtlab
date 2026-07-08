<!-- src/quniv/AboutMe.svelte — personal page (quniv.qtlab.dev) -->
<script>
  import { mount, unmount } from 'svelte';
  import CV from './CV.svelte';
  import TechStack from '../components/TechStack.svelte';

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
    background: var(--surface);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: var(--space-3xl) var(--space-xl);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  /* Single-color subtle accent line — no rainbow shimmer */
  header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-dim), transparent);
  }

  .main-quote {
    color: var(--text-primary);
    font-size: 1.4rem;
    font-style: italic;
    font-weight: 300;
    text-align: center;
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.9;
    letter-spacing: 0.3px;
    opacity: 0.9;
  }

  /* ── Main ── */
  main {
    padding: var(--space-xl) var(--space-xl) var(--space-2xl);
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Profile Section ── */
  .profile-section {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--space-2xl);
    margin-bottom: var(--space-2xl);
    align-items: start;
  }

  .profile-card {
    background: var(--surface-raised);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    padding: 2.5rem 1.75rem;
    text-align: center;
    border-radius: var(--radius-md);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .profile-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 36px rgba(0, 0, 0, 0.45);
    border-color: var(--border-active);
  }

  img.profile {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 2px solid var(--border-active);
    margin-bottom: 1.2rem;
    transition: transform 0.3s ease, border-color 0.3s ease;
    box-shadow: 0 0 0 4px rgba(157, 132, 245, 0.08);
    object-fit: cover;
  }

  img.profile:hover {
    transform: scale(1.06);
    border-color: var(--accent);
    box-shadow: 0 0 0 6px rgba(157, 132, 245, 0.12);
  }

  .name {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0.75rem 0 0.4rem;
    letter-spacing: 0.5px;
  }

  .role {
    color: var(--accent);
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: var(--font-mono);
  }

  /* ── Bio Section ── */
  .bio-section {
    background: var(--surface-raised);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    padding: 2.5rem;
    line-height: 1.85;
    border-radius: var(--radius-md);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .bio-section::before {
    content: 'ABOUT';
    position: absolute;
    top: -10px;
    left: 22px;
    background: var(--bg);
    padding: 1px 10px;
    color: var(--accent);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 3px;
    border-radius: 2px;
    font-family: var(--font-mono);
  }

  .bio-section p {
    margin-bottom: 0.9rem;
    color: var(--text-secondary);
    font-weight: 400;
    font-size: 0.97rem;
  }

  .bio-section p:last-child {
    margin-bottom: 0;
  }

  /* ── Footer ── */
  footer {
    background: var(--surface);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    text-align: center;
    padding: var(--space-xl);
    margin-top: var(--space-2xl);
    position: relative;
  }

  footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-dim), transparent);
  }

  footer p {
    font-weight: 400;
    letter-spacing: 0.5px;
    font-size: 0.88rem;
    margin: 0;
  }

  .cv-download-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: var(--space-md);
    padding: 0.65rem 1.8rem;
    background: transparent;
    color: var(--accent);
    text-decoration: none;
    border: 1px solid var(--accent-dim);
    border-radius: var(--radius-sm);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 1.5px;
    transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
    font-family: var(--font-mono);
    text-transform: uppercase;
    cursor: pointer;
  }

  .cv-download-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  .cv-download-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    background: var(--accent-faint-md);
    border-color: var(--accent);
  }

  .cv-download-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  .cv-error {
    color: var(--pink);
    font-size: 0.8rem;
    font-family: var(--font-mono);
    margin-bottom: 0.5rem;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .profile-section {
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }

    main {
      padding: var(--space-md) var(--space-md) var(--space-xl);
    }

    header {
      padding: var(--space-xl) var(--space-md);
    }
  }
</style>

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
      <p>Not a pro — becoming one.</p>
      <p>A realist and a dreamer.</p>
    </div>
  </div>

  <TechStack />
</main>

<footer>
  <button class="cv-download-btn" on:click={downloadCV} disabled={isGeneratingCV}>
    {isGeneratingCV ? '⏳ Generating...' : '↓ Download CV'}
  </button>
  {#if cvError}
    <p class="cv-error">{cvError}</p>
  {/if}
  <p>© 2024 Quyet Doan</p>
</footer>
