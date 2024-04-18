import { useState, useEffect } from "react";
import { CiStar } from "react-icons/ci";
import axios from "axios";
import RateProduct from "../components/modals/products/RateProduct";

import React from "react";

function StarRating({ obj, selectedPage }) {
  let local_accessToken = localStorage.getItem("accessToken");
  const numbers = [{ sl: 1 }, { sl: 2 }, { sl: 3 }, { sl: 4 }, { sl: 5 }];
  const local_orderedRating = localStorage.getItem("orderedRating");
  const [ratingDetails, setRatingDetails] = useState([]);
  const [rating, setRating] = useState(ratingDetails?.rating);
  const [ratingStar, setRatingStar] = useState();
  const [ratingComment, setRatingComment] = useState("");

  const ratingStarComment = (r, c) => {
    setRatingStar(r);
    setRatingComment(c);

    console.log("--", r, c);
  };

  // const parsedData = JSON.parse(local_orderedRating);

  const handleRate = () => {
    // e.preventDefault();

    const details = {
      rating: rating,
      comment: "new product",
    };

    axios
      .post(`http://localhost:8000/api/add_review/${obj._id}`, details, {
        headers: {
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        ratingApiCall();
        // handleClose();
      })
      .catch((err) => console.log(err.message));
  };

  const numberElements = [];
  for (let i = 0; i < rating; i++) {
    const number = numbers[i];
    numberElements.push(
      <div
        key={i}
        onClick={() => {
          setRating(i + 1);
          console.log(i + 1);
          editRatingApi(i + 1);
        }}
      >
        <CiStar size={"30px"} className="text-green-400 cursor-pointer" />
      </div>
    );
  }

  const ratingApiCall = () => {
    // console.log('-------',obj._id)
    axios
      .get(`http://localhost:8000/api/get_review/${obj._id}`, {
        headers: {
          Authorization: local_accessToken,
        },
      })
      .then((res) => {
        console.log("---rating res***", res.data.result?.[0]?.reviews);
        localStorage.setItem(
          "orderedRating",
          JSON.stringify(res.data.result?.[0]?.reviews)
        );
        setRatingDetails(res.data.result?.[0]?.reviews);
        setRating(res.data.result?.[0]?.reviews.rating);
      })
      .catch((err) => console.error(err.message));
  };

  const editRatingApi = (r) => {
    const details = {
      rating: r,
      comment: "good product",
    };

    // ratingDetails=='undefined'?console.log('un'):console.log('not un')

    if (ratingDetails == undefined) {
      // console.log('add a new rating')
      handleRate(rating);
    } else {
      axios
        .put(
          `http://localhost:8000/api/edit_review/${ratingDetails._id}`,
          details,
          {
            headers: {
              Authorization: local_accessToken,
            },
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    // console.log("rating****--_+", ratingDetails);
    // setRating(ratingDetails?.rating);
    ratingApiCall();
    // setRating(ratingDetails.rating);
    // console.log("from page--", selectedPage);
  }, []);

  return (
    <div className="w-full flex justify-start">
      {/* {numberElements} */}

      <div className="relative">
        <div className="flex gap-2 absolute">
          {numbers.map((s, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setRating(i + 1);
                  console.log(i + 1);
                  editRatingApi(i + 1);
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
        {/* Edit product button */}
        {/* <p className="absolute left-52 text-blue-500 cursor-pointer">
          <RateProduct
            productId={obj._id}
            ratingStarComment={ratingStarComment}
          />
        </p> */}
      </div>
    </div>
  );
}

export default StarRating;
