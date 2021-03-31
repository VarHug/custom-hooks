import { useMemo } from 'react';
import useToggle from '../useToggle';

const useBoolean = (defaultValue = false) => {
  const [state, { toggle }] = useToggle(defaultValue);

  const actions = useMemo(() => {
    const setTrue = () => toggle(true);
    const setFalse = () => toggle(false);

    return {
      toggle,
      setTrue,
      setFalse
    };
  }, [toggle]);

  return [state, actions];
};

export default useBoolean;
