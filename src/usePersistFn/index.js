import { useRef } from 'react';

const usePersistFn = (fn) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const persistFnRef = useRef();
  if (!persistFnRef.current) {
    persistFnRef.current = function (...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return persistFnRef.current;
};

export default usePersistFn;
