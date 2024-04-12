import { useState } from "react";
import "./App.css";
import { CiStar } from "react-icons/ci";

import React from "react";

function App() {
  const numbers = [{ sl: 1 }, { sl: 2 }, { sl: 3 }, { sl: 4 }, { sl: 5 }];
  // const stars = [{ sl: 1 }, { sl: 2 }, { sl: 3 }, { sl: 4 }];
  const [rating, setRating] = useState(0);

  const numberElements = [];
  for (let i = 0; i < rating; i++) {
    const number = numbers[i];
    numberElements.push(
      <div
        key={i}
        onClick={() => {
          setRating(i + 1);
          console.log(i + 1);
        }}
      >
        <CiStar size={"40px"} className="text-green-400 cursor-pointer" />
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-28 bg-black text-white h-screen w-screen">
      {/* {numberElements} */}

      <div className="border border-black inline-block relative">
        <div className="flex gap-2 absolute">
          {numbers.map((s, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setRating(i + 1);
                  console.log(i + 1);
                }}
              >
                <CiStar size={"40px"} className="text-white cursor-pointer" />
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 absolute ">{numberElements}</div>
      </div>
    </div>
  );
}

export default App;
