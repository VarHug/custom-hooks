import { useMemo, useState } from 'react';

const useToggle = (defaultValue, reverseValue) => {
  const [state, setState] = useState(defaultValue);

  const actions = useMemo(() => {
    const reverseOrigin =
      reverseValue === undefined ? !defaultValue : reverseValue;

    const toggle = (value) => {
      if (value !== undefined) {
        setState(value);
        return;
      }
      setState((s) => (s === defaultValue ? reverseOrigin : defaultValue));
    };

    const setLeft = () => setState(defaultValue);

    const setRight = () => setState(reverseOrigin);

    return {
      toggle,
      setLeft,
      setRight
    };
  }, [defaultValue, reverseValue]);

  return [state, actions];
};

export default useToggle;
