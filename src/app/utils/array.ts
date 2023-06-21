export function removeItemInArray(items: any[], index: number) {
  let r = [];
  for (let i = 0; i < items.length; i++) {
    if (i === index) {
      continue;
    }
    r.push(items[i]);
  }
  return r;
}
