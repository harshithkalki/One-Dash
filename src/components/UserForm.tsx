import { Form, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineCamera } from "react-icons/ai";
import Popup from "reactjs-popup";
import { api } from "~/utils/api";

type props = {
  closeModal: () => void;
  open: boolean;
};

const UserForm = ({ open, closeModal }: props) => {
  const [visibility, setVisibility] = useState(false);
  const [statevisibility, setStateVisibility] = useState(false);

  const [flagOption, setflagedOption] = useState("");

  const [search, setSearch] = useState("");
  const options = [
    {
      countryName: "United States",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    },

    {
      countryName: "United Kingdom",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
    },

    {
      countryName: "Canada",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg",
    },

    {
      countryName: "Australia",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
    },

    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
  ];
  const options1 = [
    {
      countryName: "United States",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    },

    {
      countryName: "United Kingdom",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
    },

    {
      countryName: "Canada",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg",
    },

    {
      countryName: "Australia",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
    },

    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
  ];
  const User = api.user.me.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const Userinfo = User.data;
  const updateMe = api.user.updateMe.useMutation();

  const Values = {
    firstName: Userinfo?.firstName as unknown as string,
    lastName: Userinfo?.lastName ?? "",
    email: Userinfo?.email ?? "",
    phone: Userinfo?.phone ?? "",
    country: Userinfo?.country ?? "",
    city: Userinfo?.city ?? "",
    profile: Userinfo?.profile ?? "",
    companyName: Userinfo?.companyName ?? "",
    addressFirstname: Userinfo?.addressFirstname ?? "",
    addressLastname: Userinfo?.addressLastname ?? "",
    address: Userinfo?.address ?? "",
    state: Userinfo?.state ?? "",
    zipcode: Userinfo?.zipcode ?? "",
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      profile: "",
      companyName: "",
      addressFirstname: "",
      addressLastname: "",
      address: "",
      state: "",
      zipcode: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      await updateMe
        .mutateAsync(values)
        .then(() => {
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const [stateselectedOption, setStateSelectedOption] = useState(
    formik.values.state ?? ""
  );

  const [selectedOption, setSelectedOption] = useState(
    formik.values.country ?? ""
  );

  useEffect(() => {
    void formik.setValues({
      firstName: Userinfo?.firstName as unknown as string,
      lastName: Userinfo?.lastName ?? "",
      email: Userinfo?.email ?? "",
      phone: Userinfo?.phone ?? "",
      country: Userinfo?.country ?? "",
      city: Userinfo?.city ?? "",
      profile: Userinfo?.profile ?? "",
      companyName: Userinfo?.companyName ?? "",
      addressFirstname: Userinfo?.addressFirstname ?? "",
      addressLastname: Userinfo?.addressLastname ?? "",
      address: Userinfo?.address ?? "",
      state: Userinfo?.state ?? "",
      zipcode: Userinfo?.zipcode ?? "",
    });
  }, [Userinfo]);

  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      {User.isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin" size={24} />
        </div>
      ) : (
        <div className="font-play  mx-auto max-w-[90%] cursor-pointer rounded-[8px] border-[1px] border-[#EBEBEB] bg-white shadow-2xl sm:max-w-[550px]">
          {/* <Form> */}
          <div className="EditProfile--gap flex flex-col p-3   py-1 sm:p-0 sm:px-6 md:py-1 lg:px-8">
            <div className="mt-0 flex items-center justify-between md:mt-2">
              <h3 className="text-[18px] font-[600] text-[#131313]">
                Edit Profile
              </h3>
              <img
                onClick={closeModal}
                className="cursor-pointer "
                src={"/img/icon/Close Icon.svg"}
                alt="close"
              />
            </div>
            <div className="flex items-center justify-center py-0 md:py-2">
              <div className="relative">
                <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-1 shadow-md">
                  <AiOutlineCamera
                    size={25}
                    className="EditProfile--subimg rounded-full   bg-blue-500 p-1 text-white"
                  />
                </div>
                <img
                  src={"/img/user/Avatar_3.png"}
                  className="EditProfile--img"
                  width={76}
                  height={76}
                  alt="pic"
                />
              </div>
            </div>
            <div className="EditProfile flex  justify-between  space-x-5 py-1 md:py-1">
              <div className="basis-1/2">
                <label className="font-play mb-0 block text-sm font-[500] md:mb-0">
                  First Name
                </label>
                <div className="relative">
                  <input
                    className="focus:shadow-outline mb-0 h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                    id="firstname"
                    name="firstname"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="First Name"
                    required
                  />
                </div>
              </div>
              <div className="basis-1/2">
                <label className="font-play mb-0 block text-sm font-[500] md:mb-0">
                  Last Name
                </label>
                <div className="relative">
                  <input
                    className="focus:shadow-outline   mb-0 h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                    id="lastname"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formik.values.lastName || ""}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="EditProfile EditProfile py-1 md:py-0">
              <label
                className="font-play mb-0 block text-sm font-[500] md:mb-1"
                htmlFor="username"
              >
                Email
              </label>
              <input
                required
                className="focus:shadow-outline h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                id="email"
                type="email"
                name="email"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                placeholder="Email"
                readOnly
              />
            </div>
            <div className="EditProfile EditProfile--gap py-1 md:py-2">
              <label
                className="font-play mb-0 block text-sm font-[500] md:mb-1"
                htmlFor="username"
              >
                Phone Number
              </label>
              <input
                required
                className="focus:shadow-outline h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                id="phone"
                type="text"
                name="phone"
                value={formik.values.phone || ""}
                onChange={formik.handleChange}
                placeholder="Phone Number"
              />
            </div>
            <div className="EditProfile font-play py-1 text-sm font-[500]  md:py-0">
              <p>Country</p>
            </div>
            <div className="EditProfile py-1 md:py-2">
              <div
                className="select relative block  h-8 w-[100%] cursor-pointer   border  bg-white   px-[16px] text-[14px] text-black"
                onClick={(e) => {
                  setVisibility(!visibility);
                  setSearch("");
                }}
              >
                <div className="selected-option relative flex h-full items-center justify-between">
                  <span
                    className="focus:shadow-outline mb-0  flex w-full    appearance-none items-center gap-4 rounded leading-tight  !text-gray-700 focus:outline-none"
                    title={
                      selectedOption === ""
                        ? "Select a Country"
                        : selectedOption
                    }
                  >
                    {flagOption === "" ? (
                      ""
                    ) : (
                      <img width={35} height={35} src={flagOption} alt="flag" />
                    )}
                    {selectedOption === ""
                      ? "Select a Country"
                      : selectedOption.length <= 20
                      ? selectedOption
                      : `${selectedOption.slice(0, 20)}...`}
                  </span>
                  <img
                    className={`${
                      visibility
                        ? "rotate-[0deg] transition-all"
                        : "rotate-[180deg] transition-all"
                    }`}
                    width={20}
                    height={20}
                    src="/img/icon/ArrowUp 2.svg"
                    alt="icon"
                  />
                </div>
                {visibility && (
                  <div className="options absolute left-0 top-[40px] z-50 max-h-[209px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3 ">
                    <ul>
                      {options.map(({ countryName, flagImgUrl }, index) => (
                        <li
                          key={index}
                          className={
                            selectedOption === countryName
                              ? "active-option font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                              : "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                          }
                          onClick={() => {
                            void formik.setFieldValue("country", countryName);
                            setSelectedOption(countryName);
                            setflagedOption(flagImgUrl);
                          }}
                        >
                          {countryName}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="font-play EditProfile  py-1 text-sm font-[500] md:py-1">
              <p>Billing Address</p>
            </div>

            <div className="EditProfile flex justify-between space-x-4 py-2 md:py-0">
              <div className="basis-1/2">
                <div className="relative">
                  <input
                    className="focus:shadow-outline mb-0 h-8 w-full appearance-none rounded border px-3  text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none md:mb-0"
                    id="firstnameaddress"
                    type="text"
                    required
                    name="addressFirstname"
                    value={formik.values.addressFirstname ?? ""}
                    onChange={formik.handleChange}
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="basis-1/2">
                <div className="relative">
                  <input
                    className="focus:shadow-outline mb-0 h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none md:mb-0"
                    id="lastnameaddress"
                    type="text"
                    required
                    name="addressLastname"
                    value={formik.values.addressLastname ?? ""}
                    onChange={formik.handleChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>
            <div className="EditProfile py-1 md:py-2">
              <input
                className="focus:shadow-outline h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                id="company"
                type="text"
                name="companyName"
                value={formik.values.companyName ?? ""}
                onChange={formik.handleChange}
                placeholder="Company Name Optional"
              />
            </div>
            <div className="EditProfile py-1 md:py-1">
              <input
                className="focus:shadow-outline h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                id="address"
                required
                name="address"
                value={formik.values.address ?? ""}
                onChange={formik.handleChange}
                type="text"
                placeholder="Address"
              />
            </div>
            <div className="EditProfile flex justify-between space-x-4 py-1 md:py-1">
              <div className="basis-1/3">
                <div className="relative">
                  <input
                    className="focus:shadow-outline mb-3 h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                    id="ciry"
                    required
                    name="city"
                    value={formik.values.city ?? ""}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="City"
                  />
                </div>
              </div>
              <div className="relative basis-1/3">
                <div
                  className="select relative block  h-8 w-[100%] cursor-pointer   border  bg-white   px-[16px] text-black"
                  onClick={(e) => {
                    setStateVisibility(!statevisibility);
                  }}
                >
                  <div className="selected-option relative flex h-full items-center justify-between">
                    <span
                      className="flex items-center gap-1 !text-[13px]"
                      title={
                        stateselectedOption === ""
                          ? "State"
                          : stateselectedOption
                      }
                    >
                      {stateselectedOption === ""
                        ? "State"
                        : stateselectedOption.length <= 20
                        ? stateselectedOption
                        : `${stateselectedOption.slice(0, 20)}...`}
                    </span>
                    <img
                      className={`${
                        statevisibility
                          ? "rotate-[0deg] transition-all"
                          : "rotate-[180deg] transition-all"
                      }`}
                      width={20}
                      height={20}
                      src="/img/icon/ArrowUp 2.svg"
                      alt="icon"
                    />
                  </div>
                  {statevisibility && (
                    <div className="options absolute left-0 top-[35px] z-50 max-h-[100px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3 ">
                      <ul>
                        {options1.map(({ countryName, flagImgUrl }, index) => (
                          <li
                            key={index}
                            className={
                              stateselectedOption === countryName
                                ? "active-option font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                                : "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                            }
                            onClick={() => {
                              void formik.setFieldValue("state", countryName);
                              setStateSelectedOption(countryName);
                            }}
                          >
                            {countryName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="basis-1/3">
                <div className="relative">
                  <input
                    className="focus:shadow-outline mb-3 h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                    id="zipcode"
                    required
                    type="text"
                    name="zipcode"
                    value={formik.values.zipcode ?? ""}
                    onChange={formik.handleChange}
                    placeholder="Zip Code"
                  />
                </div>
              </div>
            </div>
            <div className="EditProfile mb-2 py-1 md:py-2">
              <button
                className="w-full bg-blue-500 px-2 py-2 text-white md:py-3"
                onClick={() => {
                  formik.handleSubmit();
                }}
                disabled={formik.isSubmitting}
              >
                Save
              </button>
            </div>
          </div>
          {/* </Form> */}
        </div>
      )}
    </Popup>
  );
};

export default UserForm;
