export function unique(arr) {
  return [...new Set(arr)];
}

export function flatten(arr) {
  return arr.flat(Infinity);
}

export function shuffle(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

export function sum(arr) {
  return arr.reduce((total, cur) => total + cur, 0);
}

export function avg(arr) {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

export function max(arr) {
  return Math.max(...arr);
}

export function min(arr) {
  return Math.min(...arr);
}