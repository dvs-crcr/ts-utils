type Indexed<T = unknown> = {
  [key in string]: T;
};
type Snib = string | bigint | number | boolean;

export default function isEqual(a: object | null, b: object | null): boolean {
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  const checkType = (a: unknown, b: unknown): boolean => {
    if (typeof a !== typeof b) {
      throw false
    }
    if (typeof a === 'function' && typeof b === 'function' || typeof a === 'symbol' && typeof b === 'symbol') {
      compareFunctionOrSymbol(a, b)
    }
    if (
      typeof a === 'string' && typeof b === 'string'
      || typeof a === 'number' && typeof b === 'number'
      || typeof a === 'bigint' && typeof b === 'bigint'
      || typeof a === 'boolean' && typeof b === 'boolean'
    ) {
      compareSNIB(a, b)
    }
    if (typeof a === 'object' && typeof b === 'object') {
      if (a === null && b === null) {

      } else {
        if (a === null && b !== null || a !== null && b === null) {
          throw false
        }
        if (Array.isArray(a) && Array.isArray(b)) {
          compareArray(a!, b!)
        } else {
          compareObjects((a as Indexed<unknown>), (b as Indexed<unknown>))
        }
      }
    }
    return true
  }
  
  const compareFunctionOrSymbol = (a: Function | symbol, b: Function | symbol) => {
    if (a.toString() !== b.toString()) {
      throw false
    }
  }

  const compareSNIB = (a: Snib, b: Snib) => {
    if (a !== b) {
      throw false
    }
  }

  const compareArray = (a: unknown[], b: unknown[]) => {
    if (a.length !== b.length) {
      throw false
    }
    for (let key in b) {
      if (typeof a[key] === 'undefined') {
        throw false
      }
      checkType(a[key], b[key])
    }
  }

  const compareObjects = (a: Indexed, b: Indexed) => {
    if (Object.keys(a).length !== Object.keys(b).length) {
      throw false
    }
    for (let key in b) {
      if (typeof a[key] === 'undefined') {
        throw false
      }
      checkType(a[key], b[key])
    }
  }

  try {
    return checkType(a, b);
  } catch (error) {
    return false
  }
}