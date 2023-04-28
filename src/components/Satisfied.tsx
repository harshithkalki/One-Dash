import React, { useState } from "react";
import { BsChevronDown, BsChevronUp, BsStar, BsStarHalf } from "react-icons/bs";
import DetailInvoice from "./card/DetailInvoice";
import Popup from "reactjs-popup";
import ReactStars from "react-rating-stars-component";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Satisfied: React.FC = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [rating, setRating] = useState(0);
  // const ratingChanged = (newRating: number) => {
  //   setRating(newRating);
  // };
  const [feedback, setFeedback] = useState("");
  const router = useRouter();
  const id = router.query.id;
  const giveRating = api.order.giveRating.useMutation();
  const repair = api.order.Repair.useMutation();
  async function onSubmit() {
    await giveRating
      .mutateAsync({
        id: id as string,
        rating: rating,
        ratingComment: feedback,
      })
      .then((res) => {
        closeModal();
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="font-play flex flex-col items-center border bg-white p-3 shadow-sm">
        <h3 className="py-4 text-center text-xl text-black">
          Are you satisfied with me delivery ?
        </h3>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 px-4 py-3 text-[16px] text-white md:w-52 xl:text-[14px] 2xl:text-[16px]"
            onClick={() => setOpen((o) => !o)}
          >
            Yes
          </button>
          <button
            className="border border-blue-500 bg-white px-4 py-3 text-[16px] text-blue-500 lg:w-52 xl:text-[14px] 2xl:text-[16px]"
            onClick={() =>
              void repair
                .mutateAsync({ id: id as string })
                .then(() => router.reload())
            }
          >
            I still need something
          </button>
        </div>
        <p className="py-8 text-center text-blue-500">
          Order will be automatically marked complete after 3 days
        </p>
      </div>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="font-play flex w-[350px] flex-col items-center justify-center border bg-white p-4 shadow-sm md:w-[750px]">
          <p className="py-2 text-center text-2xl text-black">
            Please rate your experience
          </p>
          <div className="py-2">
            <ReactStars
              count={5}
              onChange={setRating}
              value={rating}
              size={41}
              // isHalf={true}
              emptyIcon={
                <BsStar size={30} className="bg-blue-500 text-blue-500" />
              }
              halfIcon={<BsStarHalf size={30} />}
              fullIcon={<BsStar size={30} />}
              activeColor="#FFC100"
            />
          </div>
          <input
            type="text"
            placeholder="Share your fedbeck here"
            className="w-full border p-2 py-3 md:w-2/3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            className="mt-8 w-full bg-blue-500 py-3 text-white md:w-2/3"
            onClick={() => {
              void onSubmit();
            }}
          >
            Share Feedback
          </button>
        </div>
      </Popup>
    </>
  );
};

export default Satisfied;
