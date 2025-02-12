'use client'
import React, { useState } from 'react';

export default React.memo(function Background() {
  const [circles] = useState(() => 
    [...Array(25)].map(() => ({
      width: `${Math.random() * 8 + 4}rem`,
      height: `${Math.random() * 8 + 4}rem`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      backgroundColor: `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, ${Math.random()})`,
      animationDuration: `${20 + Math.random() * 20}s`
    }))
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-40 w-full h-100vh">
      {circles.map((style, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{ ...style, animationDelay: `${i * 2}s` }}
        />
      ))}
    </div>
  );
});