'use client'
import { useState } from 'react';

interface Bike {
  id: number;
  name: string;
  rented: boolean;
}

const bikes: Bike[] = [
  { id: 1, name: 'Mountain Adventurer', rented: false },
  { id: 2, name: 'Vintage Cruiser', rented: true },
  { id: 3, name: 'City Commuter', rented: false }
];

export default function BikeList() {
  const [showRented, setShowRented] = useState(true);

  const visibleBikes = bikes.filter(bike => showRented || !bike.rented);

  return (
    <div>
      <h2>Featured Bikes</h2>
      <label>
        <input
          type="checkbox"
          aria-label="Show rented"
          checked={showRented}
          onChange={() => setShowRented(v => !v)}
        />
        Show rented
      </label>
      <ul>
        {visibleBikes.map(bike => (
          <li key={bike.id}>{bike.name}</li>
        ))}
      </ul>
    </div>
  );
}
