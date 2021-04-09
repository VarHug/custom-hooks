import { renderHook } from '@testing-library/react-hooks';
import usePrevious from './index';

describe('usePrevious', () => {
  it('should be defined', () => {
    expect(usePrevious).toBeDefined();
  });

  const getHook = (initialValue = 0, compareFunction) => {
    return renderHook(
      ({ val, cmp }) => {
        return usePrevious(val, cmp);
      },
      {
        initialProps: {
          val: initialValue,
          cmp: compareFunction
        }
      }
    );
  };

  it('should return undefined on init', () => {
    expect(getHook().result.current).toBeUndefined();
  });

  it('should update previous value', () => {
    const hook = getHook(0);

    expect(hook.result.current).toBeUndefined();

    hook.rerender({ val: 1 });
    expect(hook.result.current).toBe(0);

    hook.rerender({ val: 2 });
    expect(hook.result.current).toBe(1);

    hook.rerender({ val: 3 });
    expect(hook.result.current).toBe(2);

    hook.rerender({ val: 4 });
    expect(hook.result.current).toBe(3);

    hook.rerender({ val: 5 });
    expect(hook.result.current).toBe(4);
  });

  it('should receive a predicate as a second parameter that will compare prev and current', () => {
    const obj1 = { label: 'John', value: 'john' };
    const obj2 = { label: 'Jonny', value: 'john' };
    const obj3 = { label: 'Kate', value: 'kate' };
    const predicate = (a, b) => (a ? a.value !== b.value : true);

    const hook = getHook(obj1, predicate);
    expect(hook.result.current).toBeUndefined();

    hook.rerender({ val: obj2, cmp: predicate });
    expect(hook.result.current).toBeUndefined();

    hook.rerender({ val: obj3, cmp: predicate });
    expect(hook.result.current).toBe(obj1);
  });
});
