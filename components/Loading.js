import Image from "next/image";

function Loading() {
  return (
    <div className="fixed inset-0 w-full h-full grid place-items-center opacity-70 bg-black">
      <Image
        className=" opacity-100 bg-transparent text-white"
        src="/loading/loading.svg"
        alt=""
        width={100}
        height={100}
      />
    </div>
  );
}

export default Loading;
