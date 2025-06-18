class CountdownTimer {
  constructor(targetDateString) {
    this.targetDate = new Date(targetDateString);

    this.elements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds'),
    };

    this.intervalId = null;
  }

  start() {
    this.update();
    this.intervalId = setInterval(() => this.update(), 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  update() {
    const now = new Date();
    const diff = this.targetDate - now;

    if (diff <= 0) {
      this.render(0, 0, 0, 0);
      this.stop();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.render(days, hours, minutes, seconds);
  }

  render(days, hours, minutes, seconds) {
    this.elements.days.textContent = this.format(days);
    this.elements.hours.textContent = this.format(hours);
    this.elements.minutes.textContent = this.format(minutes);
    this.elements.seconds.textContent = this.format(seconds);
  }

  format(num) {
    return num.toString().padStart(2, '0');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const countdown = new CountdownTimer('2025-12-31T23:59:59');
  countdown.start();
});
