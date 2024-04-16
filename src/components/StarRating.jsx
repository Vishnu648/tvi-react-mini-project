import { useState, useEffect } from "react";
import { CiStar } from "react-icons/ci";

import React from "react";

function StarRating({ ratingDetails }) {
  const numbers = [{ sl: 1 }, { sl: 2 }, { sl: 3 }, { sl: 4 }, { sl: 5 }];
  const [rating, setRating] = useState(ratingDetails?.rating);
  const local_orderedRating = localStorage.getItem("orderedRating");
  // const parsedData = JSON.parse(local_orderedRating);

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
        <CiStar size={"30px"} className="text-green-400 cursor-pointer" />
      </div>
    );
  }

  useEffect(() => {
    console.log("rating****--_+", ratingDetails);
    setRating(ratingDetails?.rating);
  }, [ratingDetails]);

  return (
    <div className="w-full flex justify-start">
      {/* {numberElements} */}

      <div className=" relative">
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
                <CiStar
                  size={"30px"}
                  className="text-gray-300 cursor-pointer"
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 absolute ">{numberElements}</div>
      </div>
    </div>
  );
}

export default StarRating;
