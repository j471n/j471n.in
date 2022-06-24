import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { sanitize } from "dompurify";
import { ToastContainer, toast } from "react-toastify";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const toastOptions = {
    theme: "colored",
    className: "w-full sm:w-96 font-inter",
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };

  async function subscribeNewsLetter(e) {
    e.preventDefault();
    setLoading(true);

    // validating the email if it is disposable or not
    const { disposable } = await fetch(
      `https://open.kickbox.com/v1/disposable/${email.split("@")[1]}`,
      { method: "GET" }
    ).then((res) => res.json());

    if (disposable) {
      setLoading(false);
      return toast.error(
        "You almost had me, now seriously enter the valid email",
        toastOptions
      );
    }

    // Adding the subscriber to the database
    fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({
        email: sanitize(email), // just to make sure everything is correct
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.error(res.msg, toastOptions);
        } else {
          toast.success(res.msg, toastOptions);
        }
        setLoading(false);
      });
  }

  return (
    <>
      <div className="w-full p-4 font-barlow rounded-lg border-2 bg-white dark:bg-darkSecondary/20 dark:border-neutral-600 flex flex-col gap-4 mt-10 mb-5 print:hidden">
        <h2 className="text-2xl font-bold dark:text-white !my-0">
          Jatin's Newsletter
        </h2>
        <p className="text-gray-500 !my-0">
          Get notified in your inbox whenever I write a new blog post.
        </p>

        <form className="relative w-full" onSubmit={subscribeNewsLetter}>
          <input
            className="px-4 py-3 rounded-lg text-lg bg-gray-200 dark:bg-darkSecondary outline-none border-0 w-full placeholder:text-gray-700 dark:placeholder:text-gray-400 dark:text-gray-300"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />

          <button
            className="absolute right-0 top-0 bottom-0 px-4 m-[3px] bg-white dark:text-white dark:bg-neutral-600/40   rounded-md font-medium font-inter transform duration-200 active:scale-90 select-none"
            type="submit"
          >
            <div className="relative flex items-center gap-2 !my-0">
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <AiOutlineSend className="text-xl" />
                  <p className="hidden sm:inline-flex !my-0">Subscribe</p>
                </>
              )}
            </div>
          </button>
        </form>
      </div>
      <ToastContainer
        className="w-full mx-auto"
        theme={"colored"}
        style={{ zIndex: 1000 }}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
}
