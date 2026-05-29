<style>
  /* ── Game of Life Section ── */
  .recipe-section {
    background: rgba(0, 5, 20, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(167, 139, 250, 0.2);
    padding: 3rem 2rem;
    margin: 3rem 0;
    text-align: center;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(167, 139, 250, 0.06);
    position: relative;
    overflow: hidden;
  }


  .level-system {
    position: relative;
  }

  .level-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .level-bar {
    width: 200px;
    height: 6px;
    background: rgba(167, 139, 250, 0.08);
    border: 1px solid rgba(167, 139, 250, 0.3);
    border-radius: 0;
    overflow: hidden;
  }

  .level-progress {
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #a78bfa, #fbbf24, #f472b6, #a78bfa);
    background-size: 200% 100%;
    animation: progressShift 2s linear infinite;
    border-radius: 0;
  }

  @keyframes progressShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  .level-text {
    color: #a78bfa;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 3px;
    font-family: 'JetBrains Mono', monospace;
    text-shadow: 0 0 10px rgba(167, 139, 250, 0.6);
  }

  .cycle-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .cycle-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .cycle-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 1.2rem 1.2rem;
    background: rgba(0, 5, 25, 0.9);
    border: 1px solid rgba(167, 139, 250, 0.2);
    min-width: 130px;
    transition: all 0.3s ease;
    position: relative;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(167, 139, 250, 0.04);
  }

  .cycle-step:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(167, 139, 250, 0.2), 0 0 40px rgba(167, 139, 250, 0.06);
    border-color: #a78bfa;
  }

  .cycle-step .step-number {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 24px;
    height: 24px;
    background: #a78bfa;
    color: #000;
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    font-family: 'JetBrains Mono', monospace;
  }

  .cycle-step .step-icon {
    font-size: 1.8rem;
  }

  .cycle-step .step-text {
    color: #e2d9f3;
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 1px;
  }

  .cycle-step .step-desc {
    color: #6b5a9e;
    font-size: 0.7rem;
    text-align: center;
  }

  .cycle-step.damage {
    border-color: rgba(244, 114, 182, 0.4);
    background: rgba(20, 0, 10, 0.9);
  }

  .cycle-step.damage .step-number {
    background: #f472b6;
  }

  .cycle-step.growth {
    border-color: rgba(0, 255, 120, 0.3);
    background: rgba(0, 15, 5, 0.9);
  }

  .cycle-step.growth .step-number {
    background: #00ff78;
    color: #000;
  }

  .cycle-step.next-level {
    border-color: rgba(167, 139, 250, 0.4);
    background: rgba(0, 10, 25, 0.9);
    animation: neonPulse 3s ease-in-out infinite alternate;
  }

  .cycle-step.next-level .step-number {
    background: #e0e8ff;
    color: #000;
  }

  @keyframes neonPulse {
    0% { box-shadow: 0 0 10px rgba(167, 139, 250, 0.1); }
    100% { box-shadow: 0 0 25px rgba(167, 139, 250, 0.35), 0 0 50px rgba(167, 139, 250, 0.1); }
  }

  .cycle-arrow {
    color: #a78bfa;
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.6;
    animation: arrowPulse 2s ease-in-out infinite;
    text-shadow: 0 0 8px rgba(167, 139, 250, 0.6);
  }

  @keyframes arrowPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  .loop-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: rgba(167, 139, 250, 0.04);
    border: 1px solid rgba(167, 139, 250, 0.15);
    border-radius: 2px;
  }

  .loop-arrow {
    font-size: 1.5rem;
    color: #a78bfa;
    animation: loopSpin 4s linear infinite;
    text-shadow: 0 0 10px rgba(167, 139, 250, 0.8);
  }

  @keyframes loopSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loop-text {
    color: #9d8ec4;
    font-size: 0.9rem;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .cycle-row {
      flex-direction: column;
      gap: 1rem;
    }

    .cycle-arrow {
      transform: rotate(90deg);
    }

    .cycle-step {
      min-width: 100%;
    }

    .recipe-section {
      padding: 2rem 1rem;
    }

    .loop-indicator {
      flex-direction: column;
      text-align: center;
    }
  }
</style>

<div class="recipe-section">

  <div class="recipe-content">
    <div class="level-system">
      <div class="level-indicator">
        <div class="level-bar">
          <div class="level-progress"></div>
        </div>
        <span class="level-text">LVL ∞</span>
      </div>

      <div class="cycle-container">
        <div class="cycle-row">
          <div class="cycle-step">
            <div class="step-number">1</div>
            <div class="step-icon">⚔️</div>
            <div class="step-text">Challenge</div>
            <div class="step-desc">Face the hard things</div>
          </div>
          <div class="cycle-arrow">→</div>
          <div class="cycle-step damage">
            <div class="step-number">2</div>
            <div class="step-icon">💔</div>
            <div class="step-text">Break</div>
            <div class="step-desc">Get damaged, fail</div>
          </div>
          <div class="cycle-arrow">→</div>
          <div class="cycle-step">
            <div class="step-number">3</div>
            <div class="step-icon">🛌</div>
            <div class="step-text">Recover</div>
            <div class="step-desc">Rest and heal</div>
          </div>
        </div>

        <div class="cycle-row">
          <div class="cycle-step growth">
            <div class="step-number">4</div>
            <div class="step-icon">🌱</div>
            <div class="step-text">Growth</div>
            <div class="step-desc">Adapt and learn</div>
          </div>
          <div class="cycle-arrow">→</div>
          <div class="cycle-step">
            <div class="step-number">5</div>
            <div class="step-icon">⬆️</div>
            <div class="step-text">Level Up</div>
            <div class="step-desc">Become stronger</div>
          </div>
          <div class="cycle-arrow">→</div>
          <div class="cycle-step next-level">
            <div class="step-number">6</div>
            <div class="step-icon">⚔️</div>
            <div class="step-text">Harder Challenge</div>
            <div class="step-desc">Repeat at higher level</div>
          </div>
        </div>
      </div>

      <div class="loop-indicator">
        <span class="loop-arrow">↻</span>
        <span class="loop-text">The cycle continues — each time you're stronger than before</span>
      </div>
    </div>
  </div>
</div>
