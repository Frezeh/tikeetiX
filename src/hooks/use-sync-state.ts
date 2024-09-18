import React from "react";

export default function useSyncState<T>(initialValue: T): [() => T, (value: T) => void] {
  const [_state, _setState] = React.useState({ current: initialValue });

  const getState = React.useCallback(() => _state.current, []);

  const setState = React.useCallback((value: T) => {
    _setState({ current: value }); //Triggers a re-render
    _state.current = value; //Makes update immediate
  }, []);

  return [getState, setState];
}
