import { useEffect, useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha"
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/router";
const Login = () => {
  const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const DELAY = 2000;
  const [passwordShown, setPasswordShown] = useState(false);
  const tooglePssword = () => {
    setPasswordShown(!passwordShown);
  };
  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().required("Email is required").email("Email is invalid"),
  //   password: Yup.string().required("Password is required"),
  // })

  const validationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  type FormValues = z.infer<typeof validationSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  const { data: session, status } = useSession();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        console.log();
        if (res?.error) {
          setError("email", {
            type: "manual",
            message: res.error,
          });
          setError("password", {
            type: "manual",
            message: res.error,
          });
          // console.log(res.error);
        } else {
          void router.push("/client");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(resData);
  };

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/client");
    }
  }, [status]);

  return (
    <>
      <div className="flex h-screen md:flex">
        <div className="flex w-full flex-col items-center justify-center bg-white py-10 lg:w-[35%]">
          <div className="font-play w-[100%] px-7 sm:w-[518px]  lg:w-[83%]">
            <Image
              src={"/img/Logo.svg"}
              width={280}
              height={108}
              className="mx-auto w-[50%] sm:w-[40%] xl:w-[55%]"
              alt="logo"
            />
            <form
              className="bg-teal-white"
              onSubmit={(e) => {
                e.preventDefault();
                // console.log("form submitted");
                handleSubmit(onSubmit)()
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <h3 className="mb-3 py-6 text-center text-2xl font-bold text-black">
                Hi, Welcome Back
              </h3>

              <div className="py-2">
                <label
                  className="mb-2 block text-lg font-medium text-gray-400 xl:text-[14px] 2xl:text-lg"
                  htmlFor="username"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter Your email"
                  {...register("email")}
                  className={` focus:shadow-outline w-full appearance-none rounded border-[1px] px-3 py-3 text-[16px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none xl:py-2 xl:text-[14px] 2xl:py-3 2xl:text-[16px] ${
                    errors.email ? "is-invalid" : ""
                  }`}
                />

                <p className="text-[12px] text-red-500">{loginError}</p>
                <p className="text-[12px] text-red-500">
                  {errors.email?.message}
                </p>
              </div>
              <div className="py-2">
                <label
                  className="mb-2 block text-lg font-medium text-gray-400 xl:text-[14px] 2xl:text-lg"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className={` focus:shadow-outline  mb-3 w-full appearance-none rounded border-[1px] px-3 py-3 text-[16px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none xl:py-2 xl:text-[14px] 2xl:py-3 2xl:text-[16px] ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <p className="text-[12px] text-red-500">{loginError}</p>

                  <div className="absolute right-1 top-3 flex items-center xl:top-[6px] 2xl:top-3">
                    <BiShow
                      color={passwordShown ? "black" : "#DBDBDB"}
                      size={24}
                      className="text-gray-200"
                      onClick={tooglePssword}
                    />
                  </div>
                  <p className="absolute -bottom-2 text-[12px] text-red-500">
                    {errors.password?.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <span className="cursor-pointer text-sm font-medium text-blue-500 hover:text-blue-500">
                  Forgot Password ?
                </span>
              </div>
              <div className="mt-6">
                <button
                  className="mb-2 mt-4 block w-full bg-blue-500 py-2 text-lg font-semibold text-white xl:text-[14px] 2xl:text-lg"
                  type="submit"
                >
                  Sign in
                </button>
                <button
                  className="mb-2 mt-4 flex w-full items-center justify-center space-x-2 border-[1px] bg-white py-3 text-black"
                  onClick={() => void signIn("google")}
                >
                  <FcGoogle size={24} />
                  <span className="text-lg font-semibold xl:text-[14px] 2xl:text-lg">
                    Sign in with Google
                  </span>
                </button>
              </div>
              <div className="flex justify-center py-2">
                <p className=" cursor-pointer text-base text-black xl:text-[14px] 2xl:text-lg">
                  Dont have an account yet ?{" "}
                  <Link href="/signup">
                    <span className="text-blue-500">Sign Up</span>
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
export default Login;
