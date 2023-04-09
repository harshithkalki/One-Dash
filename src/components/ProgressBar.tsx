const ProgressBar = ({
  progressPercentage,
}: {
  progressPercentage: number;
}) => {
  return (
    <div className="font-play h-4 rounded-full bg-gray-300">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`relative h-full rounded-full ${
          progressPercentage < 20
            ? "bg-[#7900A4]"
            : progressPercentage >= 20 && progressPercentage < 60
            ? "bg-[#F9C152]"
            : progressPercentage >= 60 && progressPercentage < 90
            ? "bg-[#1405C4]"
            : progressPercentage >= 90 && progressPercentage < 100
            ? "bg-orange-500"
            : "bg-green-600"
        }`}
      >
        {/* progressPercentage< 20 ? 'bg-[#7900A4]' : progressPercentage >=20 && progressPercentage < 60 ? 'bg-[#F9C152]' : progressPercentage >=60 && progressPercentage < 90 ? 'bg-teal-500' : 'bg-green-600'; */}
        <span
          className={`absolute text-white ${
            progressPercentage >= 0 ? "ml-5" : "ml-0"
          } absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-[12px] text-sm`}
        >
          {progressPercentage}%
        </span>
      </div>
    </div>
  );
};
export default ProgressBar;
