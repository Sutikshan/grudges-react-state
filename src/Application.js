import React, { useCallback, useState } from 'react';
import id from 'uuid/v4';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';
import initialState from './initialState';

const Application = () => {
  const [grudges, setGrudges] = useState(initialState);
  const addGrudge = useCallback(
    grudge => {
      grudge.id = id();
      grudge.forgiven = false;
      setGrudges([grudge, ...grudges]);
    },
    [setGrudges]
  );

  // Because toggleForgiveness has to take dependency on grudges, it can not
  // improve performance of Gruge as it render every grudge on toggling forgiveness of single grudge.
  // This problem get fixed by using useReducer
  // This problem is mentioned here - https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
  // and solution of using useReducer dispatch is given here - https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
  const toggleForgiveness = useCallback(
    id => {
      setGrudges(
        grudges.map(grudge => {
          if (grudge.id !== id) return grudge;
          return {
            ...grudge,
            forgiven: !grudge.forgiven
          };
        })
      );
    },
    [grudges, setGrudges]
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
