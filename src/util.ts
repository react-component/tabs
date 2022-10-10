/**
 * We trade Map as deps which may change with same value but different ref object.
 * We should make it as hash for deps
 * */
export function stringify<K extends string | number | symbol, V>(obj: Record<K, V> | Map<K, V>) {
  let tgt: Record<K, V>;

  if (obj instanceof Map) {
    tgt = {} as any;
    obj.forEach((v, k) => {
      tgt[k] = v;
    });
  } else {
    tgt = obj;
  }

  return JSON.stringify(tgt);
}
