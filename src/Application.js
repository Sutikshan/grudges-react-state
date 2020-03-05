import React, { useCallback, useReducer } from 'react';
import id from 'uuid/v4';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';
import initialState from './initialState';

export const ActionTypes = {
  ADD_GRUDGE: 'ADD_GRUDGE',
  TOGGLE_FORGIVENESS: 'TOGGLE_FORGIVENESS'
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_GRUDGE:
      return [...state, action.payload];
    case ActionTypes.TOGGLE_FORGIVENESS:
      return state.map(grudge =>
        grudge.id === action.payload.id
          ? { ...grudge, forgiven: !grudge.forgiven }
          : grudge
      );
    default:
      return state;
  }
};

const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(
    grudge => {
      grudge.id = id();
      grudge.forgiven = false;
      dispatch({ type: ActionTypes.ADD_GRUDGE, payload: grudge });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    id => {
      dispatch({ type: ActionTypes.TOGGLE_FORGIVENESS, payload: { id } });
    },
    [dispatch]
  );
  console.log('.....Application');

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
