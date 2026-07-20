<script>
  import { cvData as cv } from './cvData.js';
</script>

<div class="cv-root">

  <!-- HEADER -->
  <div class="cv-header">
    <h1>{cv.name}</h1>
    <p class="cv-subtitle">{cv.title}</p>
    <p class="cv-contact">
      {cv.contact.email} &nbsp;|&nbsp; {cv.contact.phone} &nbsp;|&nbsp; {cv.contact.location}
    </p>
    <p class="cv-contact">
      LinkedIn: <a href={`https://${cv.contact.linkedin}`}>{cv.contact.linkedin}</a>
      &nbsp;|&nbsp;
      GitHub: <a href={`https://${cv.contact.github}`}>{cv.contact.github}</a>
    </p>
    <p class="cv-contact">
      Website: <a href={`https://${cv.contact.website}`}>{cv.contact.website}</a>
    </p>
  </div>

  <!-- PROFESSIONAL SUMMARY -->
  <section>
    <div class="cv-section-head">
      <h2>Professional Summary</h2>
      <hr />
    </div>
    <p class="cv-summary">{cv.summary}</p>
  </section>

  <!-- TECHNICAL SKILLS -->
  <section>
    <div class="cv-section-head">
      <h2>Technical Skills</h2>
      <hr />
    </div>
    {#each cv.skills as group (group.group)}
      <div class="skill-group-label">{group.group}</div>
      {#each group.items as skill (skill.label)}
        <div class="skill-row">
          <span class="skill-bullet">&bull;</span>
          <span><strong>{skill.label}:</strong> {skill.detail}</span>
        </div>
      {/each}
    {/each}
  </section>

  <!-- PROFESSIONAL EXPERIENCE -->
  <section>
    <div class="cv-section-head">
      <h2>Professional Experience</h2>
      <hr />
    </div>
    {#each cv.experience as job (job.title + job.company)}
      <div class="entry">
        <div class="entry-title">{job.title}</div>
        <div class="entry-meta">
          <em>{job.company}</em> &nbsp;|&nbsp; {job.period}
          {#if job.description}<br/><em class="entry-desc">{job.description}</em>{/if}
        </div>
        {#if job.bullets.length}
          <ul>
            {#each job.bullets as b (b)}
              <li>{b}</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </section>

  <!-- EDUCATION -->
  <section>
    <div class="cv-section-head">
      <h2>Education</h2>
      <hr />
    </div>
    <div class="skill-row">
      <span class="skill-bullet">&bull;</span>
      <span>{cv.education}</span>
    </div>
  </section>

  <!-- ADDITIONAL INFORMATION -->
  <section>
    <div class="cv-section-head">
      <h2>Additional Information</h2>
      <hr />
    </div>
    {#each cv.additional as line (line)}
      <div class="skill-row">
        <span class="skill-bullet">&bull;</span>
        <span>{line}</span>
      </div>
    {/each}
  </section>

</div>

<style>
  /* Override the cyberpunk global rule that sets position:relative on all elements */
  .cv-root :global(*) {
    position: static !important;
    z-index: auto !important;
    animation: none !important;
    text-shadow: none !important;
    box-shadow: none !important;
  }

  .cv-root {
    width: 794px;
    min-height: 1123px;
    padding: 64px 72px 64px 72px;
    background: #ffffff;
    color: #101828;
    font-family: Calibri, 'Segoe UI', Arial, sans-serif;
    font-size: 13.5px;
    line-height: 1.5;
    box-sizing: border-box;
  }

  :global(.pdf-export) .cv-root {
    min-height: auto;
    padding-top: 0;
    padding-bottom: 0;
  }

  /* ── Header ── */
  .cv-header {
    text-align: center;
    margin-bottom: 16px;
  }

  .cv-header h1 {
    font-size: 24pt;
    font-weight: 700;
    color: #071a92;
    margin: 0 0 2px;
    letter-spacing: 1px;
  }

  .cv-subtitle {
    color: #667085;
    font-size: 12pt;
    margin: 2px 0;
  }

  .cv-contact {
    color: #667085;
    font-size: 9.5pt;
    margin: 2px 0;
  }

  .cv-contact a {
    color: inherit;
    text-decoration: none;
  }

  /* ── Section headers ── */
  section {
    margin-bottom: 14px;
  }

  .cv-section-head {
    margin-bottom: 6px;
  }

  .cv-section-head h2 {
    font-size: 11pt;
    font-weight: 700;
    color: #071a92;
    margin: 0 0 2px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cv-section-head hr {
    border: none;
    border-top: 1.5px solid #1267f4;
    margin: 0;
  }

  /* ── Summary ── */
  .cv-summary {
    margin: 6px 0 0;
    font-size: 10pt;
    text-align: justify;
  }

  /* ── Skills ── */
  .skill-group-label {
    font-weight: 700;
    font-size: 10pt;
    margin: 6px 0 2px;
  }

  .skill-row {
    display: flex;
    gap: 6px;
    margin: 1px 0;
    font-size: 10pt;
  }

  .skill-bullet {
    flex-shrink: 0;
    padding-left: 8px;
  }

  /* ── Experience / Projects ── */
  .entry {
    margin-bottom: 10px;
    page-break-inside: avoid;
  }

  .entry-title {
    font-weight: 700;
    font-size: 10.5pt;
  }

  .entry-meta {
    font-size: 9.5pt;
    color: #667085;
    margin-bottom: 3px;
  }

  .entry-desc {
    color: #667085;
    font-size: 9pt;
  }

  ul {
    margin: 2px 0 0 8px;
    padding: 0;
    list-style: none;
  }

  ul li {
    font-size: 10pt;
    margin-bottom: 1px;
    padding-left: 12px;
    text-indent: -12px;
  }

  ul li::before {
    content: '\2022  ';
  }

  p {
    margin: 3px 0;
  }
</style>
