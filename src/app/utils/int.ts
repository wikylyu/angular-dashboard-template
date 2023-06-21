export function parseIntWithDefault(s: string, def: number) {
    const r = parseInt(s, 10);
    if (isNaN(r)) {
      return def;
    }
    return r;
  }
  
  export function parseBoolean(s: string) {
    return s === 'true';
  }
  
  export function parseIntArray(s: string): number[] {
    const v: number[] = [];
    if (!s) {
      return v;
    }
    const seps = s.split(',');
    for (const sep of seps) {
      const i = parseInt(sep, 10);
      if (isNaN(i)) {
        continue;
      }
      v.push(i);
    }
    return v;
  }
  