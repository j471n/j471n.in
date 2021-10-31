function Loading() {
  return (
    <div className="fixed inset-0 w-full h-full grid place-items-center opacity-70 bg-black">
        <img
          className=" opacity-100 bg-transparent text-white"
          src="/loading/loading.svg"
          alt=""
        />
    </div>
  );
}

export default Loading;
