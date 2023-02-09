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

      <div className="-mt-5 pageTop print:hidden">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={opacityVariant}
          className="my-2 text-xl font-bold text-left md:text-3xl"
        >
          Recent watched Movies & TV Series
        </motion.h3>

        <AnimatedDiv
          variants={FadeContainer}
          className="flex items-center gap-2 pt-10 pb-5 overflow-x-scroll md:gap-4 horizontal-scrollbar"
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
