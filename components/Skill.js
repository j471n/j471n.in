import Image from "next/image";

function Skill({ data }) {
  return (
    <div className="max-w-sm w-full flex items-center justify-center px-4 py-3 shadow rounded-lg">
      <div className="image">
        <Image src={`/${data.icon}`} alt={data.name} width={60} height={60} />
      </div>
      <div className="flex flex-col pl-3 justify-evenly mx-auto my-0 capitalize w-full ">
        <div className="w-full flex justify-between mb-2 text-xl">
          <p className="name">{data.name}</p>
          <p className="font-bold">{data.level ? data.level : "0%"}</p>
        </div>
        <div className="relative">
          <div
            style={{
              maxWidth: "100%",
              width: data.level ? `${data.level}` : "10%",
            }}
            className="skill__bar absolute text-center h-[10px] rounded-xl z-10 bg-gray-900"
          ></div>
          <div className="w-ull bg-gray-200 h-[10px] z-0 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Skill;
