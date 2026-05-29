<style>
  .scroll-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    margin: 3rem 0;
  }

  .hanging-scroll {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: scrollSway 6s ease-in-out infinite;
    filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.12));
  }

  @keyframes scrollSway {
    0%, 100% { transform: rotate(-1deg); }
    50% { transform: rotate(1deg); }
  }

  .scroll-rod {
    width: 120px;
    height: 10px;
    background: linear-gradient(180deg, #1a1a3a 0%, #0a0a2a 50%, #050518 100%);
    border-radius: 0;
    box-shadow: 0 0 10px rgba(167, 139, 250, 0.2), 0 2px 4px rgba(0, 0, 0, 0.5);
    position: relative;
  }

  .scroll-rod.top::before,
  .scroll-rod.top::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 16px;
    background: linear-gradient(180deg, #a78bfa 0%, #7c3aed 50%, #4c1d95 100%);
    border-radius: 0;
  }

  .scroll-rod.top::before { left: 4px; }
  .scroll-rod.top::after { right: 4px; }

  .scroll-body {
    width: auto;
    background: linear-gradient(180deg, #080820 0%, #0a0a28 10%, #080820 50%, #0a0a28 90%, #080820 100%);
    border-left: 2px solid rgba(167, 139, 250, 0.4);
    border-right: 2px solid rgba(167, 139, 250, 0.4);
    padding: 1rem 1.2rem;
    position: relative;
  }

  .scroll-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
  }

  .scroll-text.two-col {
    flex-direction: row;
    gap: 1rem;
  }

  .scroll-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
  }

  .scroll-text span {
    font-family: 'Noto Serif SC', 'SimSun', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #a78bfa;
    text-shadow: 0 0 10px rgba(167, 139, 250, 0.6);
    transition: all 0.3s ease;
    line-height: 1.2;
  }

  .scroll-text span:hover {
    color: #f472b6;
    text-shadow: 0 0 15px rgba(255, 0, 110, 0.8);
  }

  .scroll-rod.bottom {
    position: relative;
  }

  .scroll-tassel {
    width: 4px;
    height: 40px;
    background: linear-gradient(180deg, rgba(167, 139, 250, 0.6), rgba(167, 139, 250, 0.2));
    position: relative;
    margin-top: -2px;
  }

  .scroll-tassel::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 30px;
    background: linear-gradient(180deg, #f472b6 0%, #c026d3 100%);
    clip-path: polygon(50% 0%, 100% 20%, 80% 100%, 20% 100%, 0% 20%);
  }

  .scroll-translation {
    margin-top: 2rem;
    color: #6b5a9e;
    font-size: 1rem;
    font-style: italic;
    text-align: center;
    letter-spacing: 1px;
  }

  @media (max-width: 768px) {
    .hanging-scroll {
      transform: scale(0.8);
    }
  }
</style>

<div class="scroll-section">
  <div class="hanging-scroll">
    <div class="scroll-rod top"></div>
    <div class="scroll-body">
      <div class="scroll-text two-col">
        <div class="scroll-col">
          <span>天</span>
          <span>上</span>
          <span>天</span>
          <span>下</span>
        </div>
        <div class="scroll-col">
          <span>唯</span>
          <span>我</span>
          <span>独</span>
          <span>尊</span>
        </div>
      </div>
    </div>
    <div class="scroll-rod bottom"></div>
    <div class="scroll-tassel"></div>
  </div>

</div>
