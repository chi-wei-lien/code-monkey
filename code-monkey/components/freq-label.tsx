import Image from "next/image";

const FreqLabel = (freq: string) => {
  let colorClassName = "";
  let labelName = "";
  let description = "";

  if (freq == "fundamental") {
    labelName = "Fundamental";
    colorClassName = "bg-green-400";
    description = "Essential building blocks";
  } else if (freq == "common") {
    labelName = "Common";
    colorClassName = "bg-orange-400";
    description = "Uncommon or niche topics";
  } else if (freq == "occasional") {
    labelName = "Occasional";
    colorClassName = "bg-blue-400";
    description = "Sometimes appears";
  } else if (freq == "rare") {
    labelName = "Rare";
    colorClassName = "bg-purple-400";
    description = "Uncommon or niche topics";
  } else {
    labelName = "Unknown";
    colorClassName = "bg-gray-400";
    description = "This post wasn't labeled correctly";
  }

  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${colorClassName} text-white`}
    >
      <span>{labelName}</span>
      <span>
        <div className="group relative">
          <Image
            width={14}
            height={14}
            src="/icons/information-icon.svg"
            alt="/icons/information-icon.svg"
            className="m-0 text-white"
          />
          <span
            className="group-hover:opacity-100 transition-opacity bg-gray-800 px-2 text-sm p-2 text-gray-100 rounded-md absolute left-1/2 
-translate-x-1/2 opacity-0 mt-2 mx-auto"
          >
            {description}
          </span>
        </div>
      </span>
    </div>
  );
};

export default FreqLabel;
