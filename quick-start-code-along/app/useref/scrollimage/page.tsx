"use client"

import { useState, useRef, useEffect } from 'react';

export default function CatFriends() {
  const [index, setIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const node = itemRefs.current[index];
    if (node) {
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [index]);

  return (
    <>
      <nav>
        <button
          onClick={() => {
            setIndex(prev =>
              prev < catList.length - 1 ? prev + 1 : 0
            );
          }}
        >
          Next
        </button>
      </nav>

      <div>
        <ul style={{ display: 'flex', overflowX: 'auto' }}>
          {catList.map((cat, i) => (
            <li
              key={cat.id}
              ref={(el) => {itemRefs.current[i] = el;}}
              style={{ listStyle: 'none', marginRight: 10 }}
            >
              <img
                className={index === i ? 'active' : ''}
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catCount = 10;
const catList = new Array(catCount);
for (let i = 0; i < catCount; i++) {
  const bucket = Math.floor(Math.random() * catCount) % 2;
  let imageUrl = '';
  switch (bucket) {
    case 0: {
      imageUrl = "https://placecats.com/neo/250/200";
      break;
    }
    case 1: {
      imageUrl = "https://placecats.com/millie/250/200";
      break;
    }
    case 2:
    default: {
      imageUrl = "https://placecats.com/bella/250/200";
      break;
    }
  }
  catList[i] = {
    id: i,
    imageUrl,
  };
}