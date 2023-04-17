import { products } from "../components/data/dataContents";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import { SiGooglechat } from "react-icons/si";
import NavBar from "../components/NavBar";
import React, { Fragment, useEffect } from "react";
import { useSession } from "next-auth/react";

const Home = (): JSX.Element => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || status === "loading") {
      void router.push("/login");
    }
  }, [status]);
  return (
    <Fragment>
      <nav className="flex flex-wrap items-center justify-between bg-teal-500 p-6">
        <div className="mr-6 flex flex-shrink-0 items-center text-white">
          <svg
            className="mr-2 h-8 w-8 fill-current"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="text-xl font-semibold tracking-tight">
            Multivespro
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white">
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
          <div className="text-sm lg:flex-grow">
            <Link
              href="#responsive-header"
              className="mr-4 mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
            >
              Faq
            </Link>
            <Link
              href="#responsive-header"
              className="mr-4 mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
            >
              News
            </Link>

            <Link
              href="#responsive-header"
              className="mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
            >
              Product
            </Link>
          </div>
          <div>
            <Link
              href={"/login"}
              className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-teal-500 lg:mt-0"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
      <div className="pt-24">
        <div className="container mx-auto flex flex-col flex-wrap items-center px-3 md:flex-row">
          <div className="flex w-full flex-col items-start justify-center text-center md:w-2/5 md:text-left">
            <p className="tracking-loose w-full uppercase">
              What business are you?
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Main Hero Message to sell Your Products!
            </h1>
            <p className="mb-8 text-2xl leading-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
            <button className="focus:shadow-outline mx-auto my-6 transform rounded-full bg-white px-8 py-4 font-bold text-gray-800 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:underline focus:outline-none lg:mx-0">
              Subscribe
            </button>
          </div>
          <div className="w-full py-6 text-center md:w-3/5"></div>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
