export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];

const parseChannel = function(channel : string) {
  if (/%$/.test(channel)) {
    const percentage = Number(channel.slice(0, -1));
    if (!Number.isFinite(percentage)) return null;
    return Math.max(0, Math.min(255, Math.round(percentage * 2.55)));
  }
  const numeric = Number(channel);
  if (!Number.isFinite(numeric)) return null;
  return Math.max(0, Math.min(255, Math.round(numeric)));
};

const parseAlpha = function(alpha : string) {
  if (/%$/.test(alpha)) {
    const percentage = Number(alpha.slice(0, -1));
    if (!Number.isFinite(percentage)) return null;
    return Math.max(0, Math.min(255, Math.round(percentage * 2.55)));
  }
  const numeric = Number(alpha);
  if (!Number.isFinite(numeric)) return null;
  return Math.max(0, Math.min(255, Math.round(numeric * 255)));
};

export const parseRgbColor = function(value : string, fallback : RGB) : RGB {
  if (typeof value !== 'string') return fallback;

  const color = value.trim().toLowerCase();
  let match = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (match) {
    const hex = match[1];
    if (hex.length === 3) {
      return [
        parseInt(hex.charAt(0) + hex.charAt(0), 16),
        parseInt(hex.charAt(1) + hex.charAt(1), 16),
        parseInt(hex.charAt(2) + hex.charAt(2), 16)
      ];
    }
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16)
    ];
  }

  match = color.match(/^rgba?\(\s*([^)]+)\s*\)$/i);
  if (match) {
    const parts = match[1].split(',').map(part => part.trim());
    if (parts.length >= 3) {
      const rgb = parts.slice(0, 3).map(parseChannel);
      if (rgb.every(channel => channel !== null)) {
        return rgb as RGB;
      }
    }
  }

  switch (color) {
  case 'black': return [0, 0, 0];
  case 'white': return [255, 255, 255];
  case 'red': return [255, 0, 0];
  case 'green': return [0, 128, 0];
  case 'blue': return [0, 0, 255];
  case 'yellow': return [255, 255, 0];
  case 'gray':
  case 'grey': return [128, 128, 128];
  case 'transparent': return [255, 255, 255];
  default: return fallback;
  }
};

export const parseRgbaColor = function(value : string, fallback : RGBA) : RGBA {
  if (typeof value !== 'string') return fallback;

  const color = value.trim().toLowerCase();
  let match = color.match(/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (match) {
    const hex = match[1];
    if (hex.length === 3) {
      return [
        parseInt(hex.charAt(0) + hex.charAt(0), 16),
        parseInt(hex.charAt(1) + hex.charAt(1), 16),
        parseInt(hex.charAt(2) + hex.charAt(2), 16),
        255
      ];
    }
    if (hex.length === 4) {
      return [
        parseInt(hex.charAt(0) + hex.charAt(0), 16),
        parseInt(hex.charAt(1) + hex.charAt(1), 16),
        parseInt(hex.charAt(2) + hex.charAt(2), 16),
        parseInt(hex.charAt(3) + hex.charAt(3), 16)
      ];
    }
    if (hex.length === 6) {
      return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16),
        255
      ];
    }
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
      parseInt(hex.substring(6, 8), 16)
    ];
  }

  match = color.match(/^rgba?\(\s*([^)]+)\s*\)$/i);
  if (match) {
    const parts = match[1].split(',').map(part => part.trim());
    if (parts.length >= 3) {
      const rgb = parts.slice(0, 3).map(parseChannel);
      if (rgb.every(channel => channel !== null)) {
        const alpha = parts.length >= 4 ? parseAlpha(parts[3]) : 255;
        if (alpha !== null) {
          return [
            rgb[0] as number,
            rgb[1] as number,
            rgb[2] as number,
            alpha
          ];
        }
      }
    }
  }

  switch (color) {
  case 'black': return [0, 0, 0, 255];
  case 'white': return [255, 255, 255, 255];
  case 'red': return [255, 0, 0, 255];
  case 'green': return [0, 128, 0, 255];
  case 'blue': return [0, 0, 255, 255];
  case 'yellow': return [255, 255, 0, 255];
  case 'gray':
  case 'grey': return [128, 128, 128, 255];
  case 'transparent': return [0, 0, 0, 0];
  default: return fallback;
  }
};
