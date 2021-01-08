type Indexed<T = unknown> = {
  [key in string]: T;
};

export default function mergeObjects(objectA: Indexed, objectB: Indexed): Indexed {
  const isObject = (value: unknown) => {
    if (value && value !== null && typeof value === 'object' && !Array.isArray(value)) {
      return true
    }
    return false
  }
  for (let key in objectB) {
    if (typeof objectA[key] === 'undefined') {
      objectA[key] = objectB[key]
    } else {
      if (isObject(objectA[key]) && isObject(objectB[key])) {
        mergeObjects((objectA[key] as Indexed<unknown>), (objectB[key] as Indexed<unknown>))
      } else {
        objectA[key] = objectB[key]
      }
    }
  }
  return objectA
}