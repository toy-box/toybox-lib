export function omit(props: any, keys?: string[]) {
  return Object.keys(props)
    .filter(key => !keys?.includes(key))
    .reduce((buf, key) => {
      buf[key] = props[key];
      return buf;
    }, {} as Record<string, any>);
}
