import React from "react";
const Subnav = ({
  data,
}: {
  data: {
    title: string;
  }[];
}) => {
  // const { data } = props
  console.log(data);
  return (
    <React.Fragment>
      {data.map((item) => (
        <>
          <div className="font-play flex flex-col text-[12px]">
            <p className="pl-6 pt-2 text-gray-400"> {item.title}</p>
          </div>
        </>
      ))}
    </React.Fragment>
  );
};
export default Subnav;
