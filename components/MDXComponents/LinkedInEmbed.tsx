export default function LinkedInEmbed({ id }: { id: string }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: 56.25 + "%",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 100 + "%",
          height: 100 + "%",
          border: 0,
        }}
        src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}`}
      />
    </div>
  );
}
