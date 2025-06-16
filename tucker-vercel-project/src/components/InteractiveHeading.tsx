'use client'
import { useState } from 'react';

export default function InteractiveHeading() {
  const [text, setText] = useState('Hello');
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <input aria-label="text-input" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setVisible(v => !v)} aria-label="toggle-heading">
        Toggle
      </button>
      {visible && <h1>{text}</h1>}
    </div>
  );
}
