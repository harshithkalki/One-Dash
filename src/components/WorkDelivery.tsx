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
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { shallow } from "zustand/shallow";
import useOrderStore from "~/store/orderStore";

// import Closeicon from "@/";

const SendOffer = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const id = router.query.id as string;
  const [textarea, setteatarea] = useState(0);
  const { mutateAsync } = api.invoice.createInvoice.useMutation();
  const addInvoice = useOrderStore((state) => state.addInvoice);
  const formik = useFormik({
    initialValues: {
      orderId: id,
      notes: "",
      deliveryTime: 0,
      amount: 0,
    },
    onSubmit: async (values) => {
      const { invoice } = await mutateAsync(values);
      addInvoice(invoice);
      onClose();
    },
  });

  return (
    <div className="font-play flex  w-[678px] flex-col items-center rounded-[10px] bg-white p-6 shadow-md">
      <div className="flex w-full justify-between pb-4">
        <p className="text-xl font-semibold text-black">Send Offer</p>
        <img
          className="cursor-pointer"
          src={"/img/icon/Close Icon.svg"}
          onClick={onClose}
          width={24}
          height={24}
          alt="Close"
        />
      </div>
      <div className="w-full">
        <div className="relative w-full">
          <div className="absolute bottom-2 right-2 flex items-center space-x-2">
            <span className="font-light text-gray-400">
              {`${textarea}`}/400
            </span>
            <AiOutlineSmile size={24} />
          </div>
          <textarea
            maxLength={400}
            // onChange={(e) => setteatarea(e.target.value.length)}
            className="mt-2 w-full rounded-lg border p-2 px-3 text-gray-700 focus:outline-none"
            placeholder="Describe your delivery in details"
            rows={6}
            value={formik.values.notes}
            onChange={formik.handleChange}
            name="notes"
          />
        </div>
        <div className="mt-2 h-14 w-full rounded border border-b-0 border-solid border-gray-300">
          <div className="flex h-full items-center justify-between p-2">
            <div className="flex items-center space-x-2 ">
              Total Offer Amount
            </div>
            <div className="flex h-full items-center space-x-2 border p-2">
              <span className="font-semibold text-[#131313]">$</span>
              <input
                className="w-[100px] border-gray-50 font-semibold"
                type="number"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div className=" h-14 w-full rounded border border-solid border-gray-300">
          <div className="flex h-full items-center justify-between p-2">
            <div className="flex items-center space-x-2 ">Delivery Time</div>
            <div className="flex h-full items-center space-x-2 border p-2">
              <input
                className="w-[100px] border-gray-50 font-semibold"
                type="number"
                name="deliveryTime"
                value={formik.values.deliveryTime}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-2 flex justify-end space-x-2">
          <button className="border border-blue-500 bg-white p-2.5 px-6 text-blue-500">
            Cancel
          </button>
          <button
            className="bg-blue-500 p-2.5 px-6 text-white"
            onClick={() => formik.handleSubmit()}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkDelivery = () => {
  const [open, setOpen] = useState(false);
  const [openOffer, setOpenOffer] = useState(false);
  const closeModal = () => setOpen(false);
  const [visibility, setVisibility] = useState(false);

  const closeOfferModel = () => setOpenOffer(false);
  const closeModalTwo = () => setOpenOffer(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const deliver = api.order.deliverOrder.useMutation();
  const formik = useFormik({
    initialValues: {
      orderId: id as string,
      notes: "",
      deliveryTime: 0,
      amount: 0,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const deliveryFormik = useFormik({
    initialValues: {
      orderId: id as string,
      notes: "",
    },
    onSubmit: async (values) => {
      const res = await deliver
        .mutateAsync({
          id: values.orderId,
          notes: values.notes,
        })
        .then((res) => {
          console.log(res);
          router.reload();
        });
    },
  });

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
            <img
              className="cursor-pointer"
              src={"/img/icon/Close Icon.svg"}
              width={24}
              height={24}
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
                name="notes"
                onChange={deliveryFormik.handleChange}
                value={deliveryFormik.values.notes}
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
              <button
                className="bg-blue-500 p-2.5 px-6 text-white"
                type="button"
                onClick={() => {
                  deliveryFormik.handleSubmit();
                }}
              >
                Deliver Work
              </button>
            </div>
          </div>
        </div>
      </Popup>
      {/* deliveryyyyy */}

      <Popup open={openOffer} closeOnDocumentClick onClose={closeOfferModel}>
        <SendOffer onClose={closeOfferModel} />
      </Popup>
    </React.Fragment>
  );
};
export default WorkDelivery;
