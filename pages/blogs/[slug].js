import parse from "html-react-parser";

export default function article({ article }) {
  return <div className="m-2 ">{parse(article.body_html)}</div>;
}


// Getting Params and returning it
export async function getStaticPaths() {
  const res = await fetch("https://dev.to/api/articles/me?per_page=1000", {
    headers: {
      "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
    },
  });
  const blogs = await res.json();

  const paths = blogs.map((blog) => {
    return {
      params: { slug: blog.slug.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

// Server Side Rendering of data
export async function getStaticProps(context) {
  const slug = context.params.slug;
  const res = await fetch("https://dev.to/api/articles/j471n/" + slug);
  const article = await res.json();

  return {
    props: {
      article,
    },
  };
}
