import { act, renderHook } from '@testing-library/react-hooks';
import useBoolean from './index';

const callToggle = (hook) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};

const callSetTrue = (hook) => {
  act(() => {
    hook.result.current[1].setTrue();
  });
};

const callSetFalse = (hook) => {
  act(() => {
    hook.result.current[1].setFalse();
  });
};

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useBoolean).toBeDefined();
  });

  it('test on methods', () => {
    const hook = renderHook(() => useBoolean());

    expect(hook.result.current[0]).toBe(false);

    callToggle(hook);
    expect(hook.result.current[0]).toBe(true);

    callSetFalse(hook);
    expect(hook.result.current[0]).toBe(false);

    callSetTrue(hook);
    expect(hook.result.current[0]).toBe(true);
  });
});
