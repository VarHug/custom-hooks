import { act, renderHook } from '@testing-library/react-hooks';
import useToggle from './index';

const LEFT = 'left';
const RIGHT = 'right';

const callToggle = (hook) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};

const callSetLeft = (hook) => {
  act(() => {
    hook.result.current[1].setLeft();
  });
};

const callSetRight = (hook) => {
  act(() => {
    hook.result.current[1].setRight();
  });
};

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined();
  });

  it('test on init', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBeFalsy();
  });

  it('test on methods', () => {
    const hook = renderHook(() => useToggle(true));

    expect(hook.result.current[0]).toEqual(true);

    callToggle(hook);
    expect(hook.result.current[0]).toEqual(false);

    callSetLeft(hook);
    expect(hook.result.current[0]).toEqual(true);

    callSetRight(hook);
    expect(hook.result.current[0]).toEqual(false);
  });

  it('test on optional', () => {
    const hook = renderHook(() => useToggle(LEFT, RIGHT));

    expect(hook.result.current[0]).toEqual(LEFT);

    callToggle(hook);
    expect(hook.result.current[0]).toEqual(RIGHT);

    callToggle(hook);
    expect(hook.result.current[0]).toEqual(LEFT);

    act(() => {
      hook.result.current[1].toggle(RIGHT);
    });
    expect(hook.result.current[0]).toEqual(RIGHT);
  });
});
