export default function Codepen({ id }: { id: string }) {
  return (
    <div className="my-3 print:hidden">
      <iframe
        height="600"
        style={{ marginTop: "10px" }}
        className="w-full"
        src={`https://codepen.io/j471n/embed/${id}`}
        loading="lazy"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}
