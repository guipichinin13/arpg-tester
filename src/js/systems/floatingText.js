export class FloatingTextSystem {
  constructor(container) {
    this.container = container;
  }

  show(x, y, text, kind = 'damage') {
    const el = document.createElement('div');
    el.className = `floating-text ${kind}`;
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    this.container.appendChild(el);
    window.setTimeout(() => el.remove(), 700);
  }
}
