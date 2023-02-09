import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineSend } from "react-icons/ai";
import { useDarkMode } from "@context/darkModeContext";

export default function Newsletter() {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState("");

  async function subscribeNewsLetter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      fetch(process.env.NEXT_PUBLIC_EMAIL_LIST + email, {
        mode: "no-cors",
      });
    } catch (error) {
      console.error(error);
    }
    toast.success("You have been added to my mailing list.");
    setEmail("");
  }

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-4 my-10 bg-white rounded-lg font-barlow ring-2 ring-gray-400 dark:bg-black dark:border-neutral-600 print:hidden">
        <h2 className="text-2xl font-bold dark:text-white !my-0">
          Jatin's Newsletter
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-medium !my-0">
          I write monthly Tech, Web Development and chrome extension that will
          improve your productivity. Trust me, I won't spam you.
        </p>

        <form className="relative w-full" onSubmit={subscribeNewsLetter}>
          <input
            className="px-4 py-2.5 rounded-lg text-lg bg-gray-200 dark:bg-darkSecondary outline-none border-0 w-full placeholder:text-gray-700 dark:placeholder:text-gray-400 dark:text-gray-300"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required={true}
          />

          <button
            className="absolute right-0 top-0 bottom-0 px-4 m-[3px] bg-white dark:text-white dark:bg-neutral-600/40   rounded-md font-medium font-inter transform duration-200 active:scale-90 select-none"
            type="submit"
          >
            <div className="relative flex items-center gap-2 !my-0">
              <AiOutlineSend className="text-xl" />
              <p className="hidden sm:inline-flex !my-0">Subscribe</p>
            </div>
          </button>
        </form>
      </div>

      <ToastContainer
        theme={isDarkMode ? "dark" : "light"}
        style={{ zIndex: 1000 }}
        autoClose={3000}
      />
    </>
  );
}
