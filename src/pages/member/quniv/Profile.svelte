<script>
  import { mount, unmount } from 'svelte';
  import CV from './CV.svelte';
  import { cvData as cv } from './cvData.js';

  let isGeneratingCV = $state(false);
  let cvError = $state('');

  const websiteUrl = `https://${cv.contact.website}`;
  const linkedinUrl = `https://${cv.contact.linkedin}`;
  const githubUrl = `https://${cv.contact.github}`;

  async function downloadCV() {
    if (isGeneratingCV) return;

    isGeneratingCV = true;
    cvError = '';

    const exportContainer = document.createElement('div');
    exportContainer.className = 'pdf-export';
    Object.assign(exportContainer.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '0',
      pointerEvents: 'none',
      zIndex: '-9999',
    });

    let cvInstance;

    try {
      document.body.appendChild(exportContainer);
      cvInstance = mount(CV, { target: exportContainer });

      const html2pdf = (await import('html2pdf.js')).default;
      const now = new Date();
      const date = now.toISOString().slice(0, 10).replaceAll('-', '');
      const time = now.toTimeString().slice(0, 8).replaceAll(':', '');

      await html2pdf()
        .set({
          margin: [64, 0, 64, 0],
          filename: `QuyetDoan_DevOps_CV_${date}_${time}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false, width: 794 },
          jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' },
          enableLinks: true,
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        })
        .from(exportContainer.firstElementChild)
        .save();
    } catch (error) {
      cvError = 'The CV could not be generated. Please try again.';
      console.error(error);
    } finally {
      if (cvInstance) await unmount(cvInstance);
      exportContainer.remove();
      isGeneratingCV = false;
    }
  }
</script>

<svelte:head>
  <title>{cv.name} — {cv.title}</title>
  <meta name="description" content={`Professional profile and CV of ${cv.name}, ${cv.title}.`} />
  <link rel="canonical" href={websiteUrl} />
</svelte:head>

<div class="profile-page">
  <header class="site-header">
    <a class="brand" href="/">qtlab.dev</a>
    <span class="route">/ member / quniv</span>
  </header>

  <main>
    <section class="introduction" aria-labelledby="profile-name">
      <div class="intro-copy">
        <p class="eyebrow">{cv.title} · {cv.contact.location}</p>
        <h1 id="profile-name">{cv.name}</h1>
        <p class="summary">{cv.summary}</p>

        <div class="contact-list" aria-label="Contact links">
          <a href={`mailto:${cv.contact.email}`}>{cv.contact.email}</a>
          <a href={`tel:${cv.contact.phone.replaceAll('-', '')}`}>{cv.contact.phone}</a>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>

      <div class="download-area">
        <button type="button" onclick={downloadCV} disabled={isGeneratingCV} aria-busy={isGeneratingCV}>
          {isGeneratingCV ? 'Generating CV…' : 'Download CV'}
        </button>
        <span>Generated from the information on this page.</span>
        {#if cvError}
          <p class="download-error" role="alert">{cvError}</p>
        {/if}
      </div>
    </section>

    <div class="resume-layout">
      <aside aria-label="Skills and additional information">
        <section class="resume-section" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Technical skills</h2>

          {#each cv.skills as group (group.group)}
            <div class="skill-group">
              <h3>{group.group}</h3>
              <dl>
                {#each group.items as skill (skill.label)}
                  <div class="skill-item">
                    <dt>{skill.label}</dt>
                    <dd>{skill.detail}</dd>
                  </div>
                {/each}
              </dl>
            </div>
          {/each}
        </section>

        <section class="resume-section" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          <p>{cv.education}</p>
        </section>

        <section class="resume-section" aria-labelledby="additional-heading">
          <h2 id="additional-heading">Additional</h2>
          <ul class="plain-list">
            {#each cv.additional as item (item)}
              <li>{item}</li>
            {/each}
          </ul>
        </section>
      </aside>

      <section class="resume-section experience" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Professional experience</h2>

        {#each cv.experience as job (job.title + job.company + job.period)}
          <article class="job">
            <div class="job-header">
              <div>
                <h3>{job.title}</h3>
                <p class="company">{job.company}</p>
              </div>
              <p class="period">{job.period}</p>
            </div>

            {#if job.description}
              <p class="job-description">{job.description}</p>
            {/if}

            {#if job.bullets.length}
              <ul>
                {#each job.bullets as bullet (bullet)}
                  <li>{bullet}</li>
                {/each}
              </ul>
            {/if}
          </article>
        {/each}
      </section>
    </div>
  </main>

  <footer>
    <span>{cv.name}</span>
    <a href={`mailto:${cv.contact.email}`}>{cv.contact.email}</a>
  </footer>
</div>

<style>
  .profile-page,
  .profile-page * {
    box-sizing: border-box;
  }

  .profile-page {
    --page: #f2f1ed;
    --paper: #faf9f6;
    --ink: #252525;
    --muted: #696965;
    --rule: #d8d6cf;
    --strong-rule: #aaa79e;

    min-height: 100vh;
    background: var(--page);
    color: var(--ink);
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.65;
  }

  .site-header,
  main,
  footer {
    width: min(1080px, calc(100% - 48px));
    margin: 0 auto;
  }

  .site-header {
    min-height: 64px;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    border-bottom: 1px solid var(--rule);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .brand {
    color: var(--ink);
    font-weight: 600;
    text-decoration: none;
  }

  .brand:hover,
  .brand:focus-visible {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .route {
    color: var(--muted);
  }

  main {
    padding: 5rem 0 6rem;
  }

  .introduction {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 190px;
    gap: 4rem;
    align-items: end;
    padding-bottom: 4rem;
    border-bottom: 1px solid var(--strong-rule);
  }

  .eyebrow {
    margin: 0 0 0.7rem;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(2.5rem, 7vw, 5.5rem);
    font-weight: 500;
    letter-spacing: -0.055em;
    line-height: 0.98;
  }

  .summary {
    max-width: 760px;
    margin: 2rem 0 0;
    color: #444440;
    font-size: 1rem;
  }

  .contact-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
    margin-top: 1.5rem;
  }

  .contact-list a,
  footer a {
    color: var(--ink);
    font-size: 0.82rem;
    text-decoration-color: var(--strong-rule);
    text-underline-offset: 4px;
  }

  .contact-list a:hover,
  .contact-list a:focus-visible,
  footer a:hover,
  footer a:focus-visible {
    text-decoration-color: var(--ink);
  }

  .download-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65rem;
  }

  button {
    width: 100%;
    min-height: 44px;
    border: 1px solid var(--ink);
    border-radius: 2px;
    background: var(--ink);
    color: #fff;
    cursor: pointer;
    font: 600 0.75rem 'JetBrains Mono', monospace;
    letter-spacing: 0.05em;
    transition: background 160ms ease, color 160ms ease;
  }

  button:hover:not(:disabled),
  button:focus-visible {
    background: transparent;
    color: var(--ink);
  }

  button:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 3px;
  }

  button:disabled {
    cursor: wait;
    opacity: 0.65;
  }

  .download-area span {
    color: var(--muted);
    font-size: 0.7rem;
    line-height: 1.45;
  }

  .download-error {
    margin: 0;
    color: #8b2c2c;
    font-size: 0.75rem;
  }

  .resume-layout {
    display: grid;
    grid-template-columns: minmax(230px, 0.7fr) minmax(0, 1.65fr);
    gap: 5rem;
    padding-top: 4rem;
  }

  .resume-section + .resume-section {
    margin-top: 3.5rem;
  }

  .resume-section > h2 {
    margin: 0 0 1.75rem;
    padding-bottom: 0.65rem;
    border-bottom: 1px solid var(--strong-rule);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .resume-section p,
  .resume-section li,
  dd {
    color: #50504c;
    font-size: 0.84rem;
  }

  .skill-group + .skill-group {
    margin-top: 2rem;
  }

  .skill-group h3 {
    margin: 0 0 1rem;
    font-size: 0.85rem;
    font-weight: 650;
  }

  dl,
  dd {
    margin: 0;
  }

  .skill-item + .skill-item {
    margin-top: 1rem;
  }

  dt {
    margin-bottom: 0.15rem;
    font-size: 0.78rem;
    font-weight: 650;
  }

  dd {
    line-height: 1.55;
  }

  .plain-list,
  .job ul {
    margin: 0;
    padding-left: 1rem;
  }

  .plain-list li + li,
  .job li + li {
    margin-top: 0.45rem;
  }

  .experience {
    margin-top: 0;
  }

  .job {
    padding: 0 0 2.5rem 1.5rem;
    border-left: 1px solid var(--rule);
  }

  .job + .job {
    padding-top: 0.1rem;
  }

  .job:last-child {
    padding-bottom: 0;
  }

  .job-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1.25rem;
    align-items: start;
  }

  .job h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 650;
  }

  .company,
  .period,
  .job-description {
    margin: 0.15rem 0 0;
  }

  .period {
    text-align: right;
    white-space: nowrap;
  }

  .company,
  .period {
    color: var(--muted) !important;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem !important;
  }

  .job-description {
    font-style: italic;
  }

  .job ul {
    margin-top: 1rem;
  }

  footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem 0 2.5rem;
    border-top: 1px solid var(--rule);
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
  }

  @media (max-width: 760px) {
    .site-header,
    main,
    footer {
      width: min(100% - 32px, 1080px);
    }

    main {
      padding: 3.5rem 0 4rem;
    }

    .introduction,
    .resume-layout {
      grid-template-columns: 1fr;
    }

    .introduction {
      gap: 2.5rem;
      padding-bottom: 3rem;
    }

    .download-area {
      max-width: 220px;
    }

    .resume-layout {
      gap: 4rem;
      padding-top: 3rem;
    }

    .job-header {
      grid-template-columns: 1fr;
      gap: 0.25rem;
    }

    .period {
      text-align: left;
      white-space: normal;
    }
  }

  @media (max-width: 460px) {
    .route {
      display: none;
    }

    h1 {
      font-size: 2.7rem;
    }

    footer {
      flex-direction: column;
    }
  }

  @media print {
    .site-header,
    .download-area,
    footer {
      display: none;
    }

    main {
      width: 100%;
      padding: 0;
    }

    .profile-page {
      background: #fff;
    }
  }
</style>
