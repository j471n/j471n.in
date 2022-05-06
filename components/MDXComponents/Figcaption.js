export default function figcaption({ src, caption, alt }) {
  if (caption !== undefined) {
    return (
      <figure>
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    );
  } else {
    return <img src={src} alt={alt} />;
  }
}
