import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { RiEmotionHappyLine } from "react-icons/ri";
import { SlEnergy } from "react-icons/sl";
import { useSpring, animated } from "react-spring";

const InputMessage = ({
  onSend,
}: {
  onSend: (message: string) => Promise<void>;
}) => {
  const [clicked, setClicked] = useState(true);
  const [textvalue, setTextvalue] = useState("");
  const fade = useSpring({
    opacity: clicked ? 1 : 0,
  });
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <div className="font-play border bg-white px-3 py-3 shadow-sm xl:px-3 xl:py-1 2xl:py-3">
        <div
          className="flex w-full flex-col bg-white"
          onClick={() => setClicked(!clicked)}
        >
          <div className="flex justify-between p-2">
            <div className="flex items-center space-x-2">
              <div className="h-full w-[2px] bg-blue-500"></div>
              <p className="text-base font-semibold text-black xl:text-[13px] 2xl:text-[16px]">
                Send Message
              </p>
            </div>
            <span className="text-black">
              {clicked === false ? <BsChevronDown /> : <BsChevronUp />}
            </span>
          </div>
        </div>
        <animated.div style={fade}>
          {clicked ? (
            <React.Fragment>
              <form
                className="mt-4 pl-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  void onSend(textvalue).then(() => {
                    setLoading(false);
                  });
                  setTextvalue("");
                }}
              >
                <div className="mb-4  w-[98%] border border-gray-200 bg-gray-50 ">
                  <div className="rounded-t-lg  bg-white px-4 py-2">
                    <textarea
                      maxLength={2500}
                      onChange={(e) => setTextvalue(e.target.value)}
                      id="comment"
                      rows={6}
                      className="w-full border-0 bg-white p-2 px-0 pl-2 text-[16px]  font-[400]  text-gray-900  outline-none focus:ring-0"
                      placeholder="Type your message here..."
                      required
                    />
                  </div>
                  <div className="flex items-center justify-end bg-white px-3 py-2">
                    <div className="flex items-center space-x-1 pl-0 sm:pl-2">
                      <span className="text-gray-400">
                        {textvalue.length} / 2500
                      </span>
                      <button
                        type="button"
                        className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <RiEmotionHappyLine size={20} />
                      </button>
                      <button
                        type="button"
                        className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <img src={"/img/icon/sendfileicon.svg"} alt="icon" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <SlEnergy size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <button
                    type="submit"
                    className="border border-blue-500 bg-white px-6 py-2.5 text-blue-500"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Send"}
                  </button>
                </div>
              </form>
            </React.Fragment>
          ) : null}
        </animated.div>
      </div>
    </React.Fragment>
  );
};
export default InputMessage;
