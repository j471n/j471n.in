export default function YouTube({ id }: { id: string }) {
  return (
    <div className="max-w-full overflow-hidden relative pb-[56.25%] h-0 ">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
