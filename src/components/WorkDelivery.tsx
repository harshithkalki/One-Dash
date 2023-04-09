import React, { useState } from "react";
import { AiOutlineClose, AiOutlineSmile, AiOutlinePlus } from "react-icons/ai";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { CiShop } from "react-icons/ci";
import DetailInvoice from "./card/DetailInvoice";
import { GrAttachment } from "react-icons/gr";
import Popup from "reactjs-popup";
// import ReactStars from "react-rating-stars-component"
import Image from "next/image";
import Closeicon from "../public/img/icon/Close Icon.svg";
const WorkDelivery = () => {
  const [open, setOpen] = useState(false);
  const [openOffer, setOpenOffer] = useState(false);
  const closeModal = () => setOpen(false);
  const closeModalTwo = () => setOpenOffer(false);
  const [clicked, setClicked] = useState(false);
  return (
    <React.Fragment>
      <div className="font-play flex flex-col items-center border bg-white p-3 shadow-sm">
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 px-4 py-2 text-[16px] text-white md:w-52 xl:text-[14px] 2xl:text-[16px]"
            onClick={() => setOpen(!open)}
          >
            Deliver Now
          </button>
          <button
            className="border border-blue-500 bg-white px-4 py-2 text-[16px] text-blue-500 md:w-52 xl:text-[14px] 2xl:text-[16px]"
            onClick={() => setOpenOffer(!openOffer)}
          >
            Create an Offer
          </button>
        </div>
      </div>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="shadowbox font-play flex w-[350px] flex-col items-center rounded-[10px] bg-white p-6 md:w-[678px]">
          <div className="flex w-full justify-between pb-4">
            <p className="text-xl font-semibold text-black">
              Deliver your work
            </p>
            {/* <AiOutlineClose size={24} onClick={closeModal} /> */}
            <Image
              className="cursor-pointer"
              src={Closeicon}
              onClick={closeModal}
              alt="close"
            />
          </div>
          <div className="w-full">
            <button
              className="flex items-center space-x-2"
              onClick={() => setClicked(!clicked)}
            >
              <span className="text-sm font-semibold text-black">
                Use a quick response
              </span>
              {clicked === false ? <BsChevronDown /> : <BsChevronUp />}
            </button>
            {clicked ? (
              <div className="flex w-full items-center space-x-2 py-1">
                <button className="flex items-center space-x-1 border bg-white p-1 text-[12px] text-gray-400">
                  <BiLike />
                  <span>thanks for your order</span>
                </button>
                <button className="flex items-center space-x-1 border bg-white p-1 text-[12px] text-gray-400">
                  <CiShop />
                  <span>Here is your delivery.</span>
                </button>
                <button className="flex items-center space-x-1 border bg-white p-1 text-[12px] text-blue-500">
                  <AiOutlinePlus className="text-blue-600" />
                  <span>Add New.</span>
                </button>
              </div>
            ) : null}

            <div className="relative w-full">
              <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                <span className="font-light text-gray-400">0/2500</span>
                <AiOutlineSmile size={24} />
              </div>
              <textarea
                className="mt-2 w-full rounded-lg border p-2 px-3 text-gray-700 focus:outline-none"
                placeholder="Describe your delivery in details"
                rows={5}
              />
            </div>
            <div className="flex space-x-2 py-2">
              <a className="flex items-center space-x-2 bg-gray-200 px-2 py-2 text-[12px] text-black">
                <GrAttachment />
                <span>Uploud Work</span>
              </a>
              <a className="flex items-center space-x-2 bg-gray-200 px-2 py-2 text-[12px] text-black">
                <GrAttachment />
                <span>Uploud Source Files</span>
              </a>
            </div>
            <div className="flex justify-end">
              <button className="bg-blue-500 p-2.5 px-6 text-white">
                Deliver Work
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};
export default WorkDelivery;
