export default function YouTube({ id }) {
  return (
    <div className="max-w-full overflow-hidden relative pb-[56.25%] h-0 ">
      <iframe
        className="absolute top-0 left-0 h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
