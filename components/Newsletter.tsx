import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CgSpinnerTwo } from "react-icons/cg";
import { useDarkMode } from "@context/darkModeContext";

export default function Newsletter() {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [validationLoading, setValidationLoading] = useState(false);

  async function subscribeNewsLetter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidationLoading(true);

    fetch("/api/validate/email", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success" && res.valid === true) {
          try {
            fetch(process.env.NEXT_PUBLIC_EMAIL_LIST + email, {
              mode: "no-cors",
            });
          } catch (error) {
            console.error(error);
          }
          toast.success("You have been added to my mailing list.");
          setEmail("");
        } else {
          toast.error("Please enter a valid email address.");
        }
        setValidationLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setValidationLoading(false);
      });
  }

  return (
    <>
      <div className="not-prose my-12 border border-gray-200 dark:border-gray-800 bg-white dark:bg-darkPrimary print:hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-gray-200 dark:border-gray-800">
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500 block mb-2">
            Newsletter
          </span>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Monthly digest on web dev, tech, and productivity.
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            No spam. Unsubscribe any time.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={subscribeNewsLetter} className="flex p-4 gap-2">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 min-w-0 px-3 py-2 text-sm bg-gray-50 dark:bg-darkSecondary border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors font-mono"
          />
          <button
            type="submit"
            disabled={validationLoading}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono text-[10px] tracking-[0.35em] uppercase hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {validationLoading ? (
              <CgSpinnerTwo className="w-3.5 h-3.5 animate-spin" />
            ) : (
              "Subscribe"
            )}
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
