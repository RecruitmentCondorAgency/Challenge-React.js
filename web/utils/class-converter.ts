interface ClassObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | number | symbol]: any;
}

function transform(co: unknown): string | undefined {
  if (co instanceof Array || co instanceof Object) return [...validClasses(co)].join(' ') || undefined;
  if (typeof co === 'string') return co.trim() || undefined;
  return undefined;
}

function* validClasses(value: ClassObject | unknown[]) {
  if (value instanceof Array) {
    for (const key in value) {
      const classes = transform(value[key]);
      if (classes) yield classes;
    }
  } else {
    for (const key in value) {
      if (typeof key === 'string') {
        const classes = key.trim();
        if (classes && value[key]) yield classes;
      }
    }
  }
}

export const classMerge = (...args: unknown[]) => transform(args);
