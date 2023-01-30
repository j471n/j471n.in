import MDXContent from "@lib/MDXContent";
import pageMeta from "@content/meta";
import { MovieType, PostType } from "@lib/types";
import StaticPage from "@components/StaticPage";
import { getRecentWatchedMovies } from "@lib/supabase";
import MovieCard from "@components/MovieCard";
import { motion } from "framer-motion";
import { FadeContainer, opacityVariant } from "@content/FramerMotionVariants";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";

export default function About({
  about,
  movies,
}: {
  about: PostType;
  movies: MovieType[];
}) {
  return (
    <>
      <StaticPage metadata={pageMeta.about} page={about} />

      <div className="pageTop -mt-5 print:hidden">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={opacityVariant}
          className="font-bold text-xl md:text-3xl text-left my-2"
        >
          Recent watched Movies & TV Series
        </motion.h3>

        <AnimatedDiv
          variants={FadeContainer}
          className="flex items-center gap-2 md:gap-4 overflow-x-scroll pt-10 pb-5 horizontal-scrollbar"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </AnimatedDiv>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { post: about } = await new MDXContent("static_pages").getPostFromSlug(
    "about"
  );

  const { movies } = await getRecentWatchedMovies();

  return {
    props: {
      about,
      movies,
    },
  };
}
