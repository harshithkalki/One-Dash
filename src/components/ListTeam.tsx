import Image from "next/image";
import React from "react";

type ListTeamProps = {
  team: {
    img: string;
  }[];
};

const ListTeam = ({ team }: ListTeamProps) => {
  // const { team } = props;
  return (
    <React.Fragment>
      <div className="font-play py-2 font-medium">
        <div className="flex -space-x-3 p-2 pl-3">
          {team.map((t, index) => {
            return (
              <>
                <Image src={t.img} alt="pic" width={40} height={40} />
              </>
            );
          })}
          <Image
            src={"/img/user/add_now.png"}
            alt="pic"
            width={40}
            height={40}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default ListTeam;
