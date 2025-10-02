import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, incrementBy } from './features/counter/counterSlice';
import { push, pop } from './features/stack/stackSlice';

export default function App() {
  const count = useSelector(state => state.counter.value);
  const stack = useSelector(state => state.stack.items);
  const dispatch = useDispatch();

  const [incrementValue, setIncrementValue] = useState('');
  const [stackValue, setStackValue] = useState('');

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Contador: {count}</h1>
      <div>
        <button onClick={() => dispatch(incrementBy(Number(incrementValue)))}>Increment By</button>
        <input
          type="number"
          value={incrementValue}
          onChange={(e) => setIncrementValue(Number(e.target.value))}
        />
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>

      <hr />

      <h2>Stack</h2>
      <div>
        <input
          type="text"
          value={stackValue}
          onChange={(e) => setStackValue(e.target.value)}
        />
        <button onClick={() => dispatch(push(stackValue))}>Push</button>
        <button onClick={() => dispatch(pop())}>Pop</button>
      </div>
      <ul>
        {stack.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
