import { useRef } from 'react';

const usePrevious = (state, compare) => {
  const prevRef = useRef();
  const currentRef = useRef();

  const needUpdate =
    typeof compare === 'function' ? compare(currentRef.current, state) : true;

  if (needUpdate) {
    prevRef.current = currentRef.current;
    currentRef.current = state;
  }

  return prevRef.current;
};

export default usePrevious;
