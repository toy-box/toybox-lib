export function pick(props: any, keys: string[] = []) {
  return keys.reduce((buf, key) => {
    buf[key] = props[key];
    return buf;
  }, {} as Record<string, any>);
}
