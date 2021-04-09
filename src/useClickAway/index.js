import { useEffect, useRef } from 'react';

const defaultEvent = 'click';

const useClickAway = (
  onClickAway = () => {},
  target,
  eventName = defaultEvent
) => {
  const onClickAwayRef = useRef(onClickAway);

  useEffect(() => {
    onClickAwayRef.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event) => {
      const { current: el } = target;
      el && !el.contains(event.target) && onClickAwayRef.current(event);
    };

    document.addEventListener(eventName, handler);

    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [target, eventName]);
};

export default useClickAway;
