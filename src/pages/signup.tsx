import { useState } from "react";
import Image from "next/image";
import backgoroundImg from "../../public/img/bg.svg";
import poster from "../../public/img/poster.svg";
import logoimg from "../../public/img/Logo.svg";
import { BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
const Signup = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const tooglePssword = () => {
    setPasswordShown(!passwordShown);
  };

  const validationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="flex h-screen md:flex">
        <div className="flex w-full flex-col items-center justify-center bg-white py-10 lg:w-[35%]">
          <div className="font-play w-[100%] px-7 sm:w-[518px] lg:w-[77%]">
            <Image
              src={"/img/Logo.svg"}
              width={280}
              height={108}
              className="mx-auto w-[50%] sm:w-[40%] xl:w-[55%]"
              alt="logo"
            />
            <form className="bg-teal-white" onSubmit={handleSubmit(onSubmit)}>
              <p className="mb-3 py-6 text-center text-2xl font-bold text-black">
                Lets Get Started!
              </p>
              <div className="md:flex md:justify-between md:space-x-4">
                <div className="relative w-full pb-3">
                  <label className="mb-2 block text-lg text-gray-400 xl:text-[14px] 2xl:text-lg">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      className=" focus:shadow-outline mb-0 w-full appearance-none rounded border px-3 py-3 text-[16px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none xl:py-2 xl:text-[14px] 2xl:py-3 2xl:text-[16px]"
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      {...register("firstName", {
                        required: true,
                        maxLength: 10,
                      })}
                    />
                    {errors.firstName && (
                      <p className="absolute -bottom-4 text-[12px] text-red-500">
                        First Name is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <label className="mb-2 block text-lg text-gray-400 xl:text-[14px] 2xl:text-lg">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      className=" focus:shadow-outline mb-0 w-full appearance-none rounded border px-3 py-3 text-[16px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none xl:py-2 xl:text-[14px] 2xl:py-3 2xl:text-[16px]"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      {...register("lastName", {
                        required: true,
                        maxLength: 10,
                      })}
                    />
                    {errors.lastName && (
                      <p className="absolute -bottom-4 text-[12px] text-red-500">
                        Last Name is required
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="relative mb-2 py-0 md:py-0">
                <label
                  className="mb-2 block text-lg text-gray-400 xl:text-[14px] 2xl:text-lg"
                  htmlFor="username"
                >
                  Email
                </label>
                <input
                  className=" focus:shadow-outline w-full appearance-none rounded border px-3 py-3 text-[16px] leading-tight text-gray-700  placeholder-gray-300 focus:outline-none xl:py-2 xl:text-[14px] 2xl:py-3 2xl:text-[16px]"
                  id="email"
                  type="email"
                  placeholder="Enter Your email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />

                {errors.email && (
                  <p className="absolute -bottom-4 text-[12px] text-red-500">
                    Please check the Email
                  </p>
                )}
              </div>

              <div className="mt-0">
                <button className="mb-2 mt-4 block w-full bg-[#007AFF] py-2 text-lg text-white xl:text-[14px] 2xl:text-lg">
                  Sign Up
                </button>
                <button
                  type="submit"
                  className="mb-2 mt-4 flex w-full items-center justify-center space-x-2 border bg-white py-2 text-lg text-black xl:text-[14px] 2xl:text-lg"
                >
                  <FcGoogle size={24} />
                  <span>Sign Up with Google</span>
                </button>
              </div>
              <div className="flex justify-center py-2">
                <p className="cursor-pointer text-lg text-[#131313] xl:text-[14px] 2xl:text-lg">
                  Already have an account?
                  <Link href="/login">
                    <span className="text-lg text-[#007AFF] xl:text-[14px] 2xl:text-lg">
                      {" "}
                      Sign In
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="relative overflow-hidden lg:flex lg:w-2/3 ">
          <Image
            src={"/img/bg.svg"}
            layout="fill"
            objectFit="cover"
            alt="backgorund"
          />
        </div>
      </div>
    </>
  );
};
export default Signup;
