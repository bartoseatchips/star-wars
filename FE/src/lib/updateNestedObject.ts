interface AnyObject {
  [key: string]: any;
}

export const updateNestedObject = (
  originalObject: AnyObject,
  path: string,
  value: any
): AnyObject => {
  const newObject = { ...originalObject };
  const keys = path.split('.');
  let current = newObject;

  keys.slice(0, -1).forEach((key) => {
    if (!current[key]) current[key] = {};
    current = current[key];
  });

  current[keys[keys.length - 1]] = value;
  return newObject;
};
