import { HomeHeading } from "../../pages";
import Link from "next/link";
import Image from "next/image";
import AnimatedDiv from "../FramerMotion/AnimatedDiv";
import { popUpFromBottomForText } from "../../content/FramerMotionVariants";
import Blog from "../Blog";

export default function BlogsSection({ blogs }) {
  return (
    <section>
      <HomeHeading title="Recent Posts" />

      <div className="flex flex-col gap-2 w-full">
        {blogs.map((blog) => {
          return (
            <Link key={blog.slug} href={`/blogs/${blog.slug}`} passHref>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 ">
                <AnimatedDiv
                  variants={popUpFromBottomForText}
                  className="relative hidden md:inline-flex max-w-xs ml-3"
                >
                  <Image
                    className="w-full h-full rounded-xl cursor-pointer select-none"
                    src={blog?.cover_image}
                    alt={blog.title}
                    width={500}
                    height={207}
                    // layout=""
                    quality={25}
                  />
                </AnimatedDiv>

                <Blog blog={blog} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// {/* <div className="home-section-container no-scrollbar">
//   {blogs.map((blog) => {
//     return (
//       <Link key={blog.slug} href={`/blogs/${blog.slug}`} passHref>
//         <div className="home-content-section hover-slide-animation">
//           <AnimatedDiv variants={popUpFromBottomForText}>
//             <Image
//               className="hidden w-full h-full rounded-xl mb-3 cursor-pointer select-none"
//               src={blog.cover_image}
//               alt={blog.title}
//               width={500}
//               height={207}
//               layout="responsive"
//               quality={25}
//             />
//           </AnimatedDiv>
//           <AnimatedDiv
//             variants={popUpFromBottomForText}
//             className="flex items-center justify-between my-3 text-sm sm:text-base"
//           >
//             <p className="flex items-center space-x-1">
//               <AiOutlineCalendar />
//               <span className="text-xs font-medium">
//                 {new Date(Date.parse(blog.published_at))
//                   .toDateString()
//                   .slice(4)}
//               </span>
//             </p>
//             <p className="flex items-center space-x-1">
//               <BiTime />
//               <span className="text-xs ml-1 font-medium">
//                 {blog.reading_time_minutes} mins
//               </span>
//             </p>
//           </AnimatedDiv>
//           <AnimatedHeading
//             variants={popUpFromBottomForText}
//             className="text-base sm:text-lg mb-1 font-bold md:font-extrabold truncate text-slate-600 dark:text-slate-300"
//           >
//             {blog.title}
//           </AnimatedHeading>
//           <AnimatedText
//             variants={popUpFromBottomForText}
//             className="text-xs sm:text-sm truncate-3 text-slate-400 font-medium"
//           >
//             {blog.description}
//           </AnimatedText>
//         </div>
//       </Link>
//     );
//   })}

//   <ExploreMoreButton link="/blogs" />
// </div>; */}
