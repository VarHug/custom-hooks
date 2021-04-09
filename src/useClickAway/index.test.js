import { renderHook } from '@testing-library/react-hooks';
import useClickAway from './index';

describe('useClickAway', () => {
  it('should be defined', () => {
    expect(useClickAway).toBeDefined();
  });

  let container;
  let container1;

  beforeEach(() => {
    container = document.createElement('div');
    container1 = document.createElement('div');
    container1.setAttribute('id', 'ele');
    document.body.appendChild(container);
    document.body.appendChild(container1);
  });

  afterEach(() => {
    document.body.removeChild(container);
    document.body.removeChild(container1);
  });

  it('test on dom optional', () => {
    let state = 0;
    const { rerender, unmount } = renderHook((ref) => {
      useClickAway(() => {
        state++;
      }, ref);
    });

    const containerRefFake = {};
    containerRefFake.current = container;
    rerender(containerRefFake);
    container.click();
    expect(state).toEqual(0);
    document.body.click();
    expect(state).toEqual(1);

    const container1RefFake = {};
    container1RefFake.current = container1;
    rerender(container1RefFake);
    container1.click();
    expect(state).toEqual(1);
    document.body.click();
    expect(state).toEqual(2);

    unmount();
    document.body.click();
    expect(state).toEqual(2);
  });
});
