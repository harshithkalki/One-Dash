import { useRouter } from "next/router";
import React, { useState, useMemo, useEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import SideClient from "./SideClient";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [pageUrl, setPageUrl] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setPageUrl(window.location.pathname);
  }, []);

  return (
    <div className="flex h-screen flex-row justify-start">
      {pageUrl.substr(1, 4) === "admi" ? <SideBar /> : <SideClient />}
      <div className="h-screen flex-1 bg-[#FAFAFA] md:ml-[254px] lg:ml-[190px] 2xl:ml-[256px]">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
