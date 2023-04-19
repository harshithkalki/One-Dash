import Image from "next/image";
import React from "react";

type ListTeamProps = {
  team: {
    img: string;
  }[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListTeam = ({ team, setOpen }: ListTeamProps) => {
  // const { team } = props;
  return (
    <React.Fragment>
      <div className="font-play py-2 font-medium">
        <div className="flex -space-x-3 p-2 pl-3">
          {team.map((t, index) => {
            return (
              <>
                <img
                  src={t.img}
                  alt="pic"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </>
            );
          })}
          <Image
            src={"/img/user/add_now.png"}
            alt="pic"
            width={40}
            height={40}
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default ListTeam;
