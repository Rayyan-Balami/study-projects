export function parseObject<T extends Record<string, any>>(obj: T, paramIndex: number = 1) {
  const keys: string[] = [];
  const values: any[] = [];
  const placeholders: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    // Skip undefined values
    if (value === undefined) continue;

    keys.push(key);
    values.push(value);
    placeholders.push(`$${paramIndex}`);
    paramIndex++;
  }

  const setClauseString = keys
    .map((key, index) => `${key} = $${index + (paramIndex - keys.length)}`)
    .join(', ');

  return {
    keys,
    values,
    placeholders,
    keyString: keys.join(', '),
    placeholderString: placeholders.join(', '),
    setClauseString,
    nextParamIndex: paramIndex
  };
}
