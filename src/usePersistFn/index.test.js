import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import usePersistFn from './index';

const TestHooks = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount((c) => c + 1);
  };

  const persistFn = usePersistFn(() => count);

  return { addCount, persistFn };
};

describe('usePersistFn', () => {
  it('should be defined', () => {
    expect(usePersistFn).toBeDefined();
  });

  it('usePersistFn should work', () => {
    let hook;
    act(() => {
      hook = renderHook(() => TestHooks());
    });

    const currentFn = hook.result.current.persistFn;
    expect(hook.result.current.persistFn()).toEqual(0);

    act(() => {
      hook.result.current.addCount();
    });

    expect(hook.result.current.persistFn()).toEqual(1);
    expect(currentFn).toEqual(hook.result.current.persistFn);
  });
});
