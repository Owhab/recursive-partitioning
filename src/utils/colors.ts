export function generateRandomColor(): string {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
    const lightness = Math.floor(Math.random() * 20) + 40; // 40-60%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }