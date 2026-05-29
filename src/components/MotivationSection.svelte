<script>
  let lightboxSrc = null;
  let lightboxAlt = '';

  function openLightbox(src, alt) {
    lightboxSrc = src;
    lightboxAlt = alt;
  }

  function closeLightbox() {
    lightboxSrc = null;
  }

  function handleLightboxKey(e) {
    if (e.key === 'Escape') closeLightbox();
  }
</script>

<style>
  .motivation-section {
    background: rgba(0, 5, 20, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(167, 139, 250, 0.2);
    margin: 3rem 0;
    padding: 3rem 2rem;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(167, 139, 250, 0.06);
    position: relative;
    overflow: hidden;
  }



  .motivation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .gif-card {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    border: 1px solid rgba(167, 139, 250, 0.2);
    border-radius: 2px;
    background: #000;
    transition: all 0.4s ease;
    box-shadow: 0 0 10px rgba(167, 139, 250, 0.05);
    /* button reset */
    background: none;
    border: 1px solid rgba(167, 139, 250, 0.2);
    padding: 0;
    cursor: zoom-in;
    /* override none from button reset */
    background: #000;
  }

  .gif-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s ease;
    filter: saturate(0.85) brightness(0.85);
  }

  .gif-card:hover {
    transform: scale(1.03) translateY(-4px);
    border-color: #a78bfa;
    box-shadow: 0 0 25px rgba(167, 139, 250, 0.3), 0 0 50px rgba(167, 139, 250, 0.08);
  }

  .gif-card:hover img {
    filter: saturate(1.3) brightness(1.1);
  }

  /* ── Lightbox ── */
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: lb-in 0.2s ease;
  }

  @keyframes lb-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .lightbox-overlay img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border: 1px solid rgba(167, 139, 250, 0.3);
    box-shadow: 0 0 60px rgba(167, 139, 250, 0.15);
    border-radius: 2px;
    animation: lb-scale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes lb-scale {
    from { transform: scale(0.85); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }

  .lightbox-close {
    position: fixed;
    top: 1.25rem;
    right: 1.5rem;
    background: none;
    border: 1px solid rgba(167, 139, 250, 0.4);
    color: #a78bfa;
    font-size: 1.25rem;
    line-height: 1;
    padding: 0.35rem 0.6rem;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s;
  }

  .lightbox-close:hover {
    background: rgba(167, 139, 250, 0.1);
    box-shadow: 0 0 12px rgba(167, 139, 250, 0.3);
  }

  @media (max-width: 768px) {
    .motivation-grid {
      grid-template-columns: 1fr;
    }


  }
</style>

<div class="motivation-section">
  <div class="motivation-grid">
    <button type="button" class="gif-card" on:click={() => openLightbox('images/medium-mike-tyson-boxer-wallpaper-poster-print-poster-on-13x19-original-imagc5ytjxqtnfur.webp', 'Mike Tyson')}>
      <img src="images/medium-mike-tyson-boxer-wallpaper-poster-print-poster-on-13x19-original-imagc5ytjxqtnfur.webp" alt="Mike Tyson" />
    </button>
    <button type="button" class="gif-card" on:click={() => openLightbox('images/cyberpunk.jpeg', 'Cyberpunk')}>
      <img src="images/cyberpunk.jpeg" alt="Cyberpunk" />
    </button>
    <button type="button" class="gif-card" on:click={() => openLightbox('images/Rosa_Walton_I_Really_Want_to_Stay_at_Your_House.jpg', 'Edgerunners')}>
      <img src="images/Rosa_Walton_I_Really_Want_to_Stay_at_Your_House.jpg" alt="Edgerunners" />
    </button>
    <button type="button" class="gif-card" on:click={() => openLightbox('images/mad.jpg', 'Motivation')}>
      <img src="images/mad.jpg" alt="Motivation" />
    </button>
    <button type="button" class="gif-card" on:click={() => openLightbox('images/unnamed.png', 'Motivation')}>
      <img src="images/unnamed.png" alt="Motivation" />
    </button>
    <button type="button" class="gif-card" on:click={() => openLightbox('images/ranger_training.png', 'Ranger Training')}>
      <img src="images/ranger_training.png" alt="Ranger Training" />
    </button>
    <button type="button" class="gif-card" on:click={() => openLightbox('images/fearless.png', 'Fearless')}>
      <img src="images/fearless.png" alt="Fearless" />
    </button>
    <button type="button" class="gif-card" on:click={() => openLightbox('images/seven_kings_must_die.png', 'Seven Kings Must Die')}>
      <img src="images/seven_kings_must_die.png" alt="Seven Kings Must Die" />
    </button>
    <button type="button" class="gif-card" on:click={() => openLightbox('images/valhalla.png', 'Valhalla')}>
      <img src="images/valhalla.png" alt="Valhalla" />
    </button>
    <button type="button" class="gif-card" on:click={() => openLightbox('images/vikings.png', 'Vikings')}>
      <img src="images/vikings.png" alt="Vikings" />
    </button>
  </div>
</div>

{#if lightboxSrc}
  <div class="lightbox-overlay" on:click={closeLightbox} on:keydown={handleLightboxKey} role="dialog" aria-modal="true" tabindex="-1">
    <div on:click|stopPropagation role="presentation"><img src={lightboxSrc} alt={lightboxAlt} /></div>
    <button class="lightbox-close" on:click={closeLightbox} aria-label="Close">✕</button>
  </div>
{/if}
