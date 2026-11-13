import {
  CSSProperties,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiSun,
  FiX,
} from "react-icons/fi";
import { HardcoverBook } from "@lib/types";
import styles from "./Bookshelf3D.module.css";

const BOOK_COLORS = ["#485a51", "#9b5b45", "#53677c", "#73604b", "#715a6a"];
const STATUS_LABELS: Record<number, string> = {
  1: "Want to read",
  2: "Currently reading",
  3: "Read & remembered",
};

function tiltBook(event: PointerEvent<HTMLButtonElement>) {
  if (
    event.pointerType !== "mouse" ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const stage = event.currentTarget;
  const bounds = stage.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  const x = Math.max(
    0,
    Math.min(1, (event.clientX - bounds.left) / bounds.width),
  );
  const y = Math.max(
    0,
    Math.min(1, (event.clientY - bounds.top) / bounds.height),
  );
  stage.style.setProperty("--tilt-x", `${(0.5 - y) * 10}deg`);
  stage.style.setProperty("--tilt-y", `${(x - 0.5) * 16}deg`);
  stage.style.setProperty("--shine-x", `${x * 100}%`);
  stage.style.setProperty("--shine-y", `${y * 100}%`);
}

function resetBookTilt(event: PointerEvent<HTMLButtonElement>) {
  for (const property of ["--tilt-x", "--tilt-y", "--shine-x", "--shine-y"]) {
    event.currentTarget.style.removeProperty(property);
  }
}

function BookObject({ book }: { book: HardcoverBook }) {
  const [imageFailed, setImageFailed] = useState(false);
  const color = BOOK_COLORS[book.id % BOOK_COLORS.length];
  const depth = Math.min(30, Math.max(16, (book.pages ?? 240) / 18));

  return (
    <span
      className={styles.book}
      style={
        { "--book-color": color, "--book-depth": `${depth}px` } as CSSProperties
      }
      aria-hidden="true"
    >
      <span className={styles.back} />
      <span className={styles.pages} />
      <span className={styles.topPages} />
      <span className={styles.spine} />
      <span className={styles.front}>
        {book.coverUrl && !imageFailed ? (
          <Image
            src={book.coverUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 130px, 200px"
            className={styles.cover}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className={styles.fallbackCover}>
            <span>{book.authors.join(" · ")}</span>
            <strong>{book.title}</strong>
            <span>A place on the shelf</span>
          </span>
        )}
        <span className={styles.coverBinding} />
        <span className={styles.coverLight} />
      </span>
    </span>
  );
}

function BookDetails({
  book,
  position,
  total,
  onClose,
  onPrevious,
  onNext,
  returnFocusTo,
}: {
  book: HardcoverBook;
  position: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  returnFocusTo: HTMLElement | null;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      returnFocusTo?.focus({ preventScroll: true });
    };
  }, [returnFocusTo]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="library-book-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" && position > 0) onPrevious();
        if (event.key === "ArrowRight" && position < total - 1) onNext();
      }}
    >
      <div className={styles.dialogContent}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close book details"
          autoFocus
        >
          <FiX aria-hidden="true" />
        </button>
        <div className={styles.detailStage}>
          <span className={styles.detailEyebrow}>From my bookshelf</span>
          <span className={styles.detailHalo} aria-hidden="true" />
          <span className={styles.detailBook} key={book.id}>
            <BookObject book={book} />
          </span>
          <span className={styles.detailShadow} />
        </div>
        <div className={styles.detailText} aria-live="polite">
          <span className={styles.status}>{STATUS_LABELS[book.statusId]}</span>
          <h2 id="library-book-title">{book.title}</h2>
          {book.subtitle && <p className={styles.subtitle}>{book.subtitle}</p>}
          <p className={styles.detailAuthor}>
            {book.authors.join(", ") || "Author unknown"}
          </p>
          <dl className={styles.bookFacts}>
            {book.pages != null && (
              <div>
                <dt>Pages</dt>
                <dd>{book.pages.toLocaleString()}</dd>
              </div>
            )}
            {book.releaseYear != null && (
              <div>
                <dt>Published</dt>
                <dd>{book.releaseYear}</dd>
              </div>
            )}
            {book.userRating != null && book.userRating > 0 && (
              <div>
                <dt>My rating</dt>
                <dd>
                  <span className={styles.star}>★</span>{" "}
                  {book.userRating.toFixed(1)} / 5
                </dd>
              </div>
            )}
            {book.rating != null && book.rating > 0 && (
              <div>
                <dt>Community</dt>
                <dd>{book.rating.toFixed(1)} / 5</dd>
              </div>
            )}
          </dl>
          <a
            href={`https://hardcover.app/books/${book.slug || book.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.hardcoverLink}
          >
            Explore on Hardcover <FiArrowUpRight aria-hidden="true" />
          </a>
          <div className={styles.bookNavigation}>
            <span>
              {String(position + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <div>
              <button
                type="button"
                onClick={onPrevious}
                disabled={position === 0}
                aria-label="Previous book"
              >
                <FiArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={position === total - 1}
                aria-label="Next book"
              >
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function Bookshelf3D({
  books,
  label,
}: {
  books: HardcoverBook[];
  label: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightsOn, setLightsOn] = useState(true);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const selectedBook = selectedIndex == null ? null : books[selectedIndex];

  useEffect(() => {
    try {
      setLightsOn(localStorage.getItem("books-reading-lights") !== "false");
    } catch {
      // Lighting still works when preference storage is unavailable.
    }
  }, []);

  const toggleLights = () => {
    const next = !lightsOn;
    setLightsOn(next);
    try {
      localStorage.setItem("books-reading-lights", String(next));
    } catch {
      // Saving the lighting preference is optional.
    }
  };

  const openBook = (index: number, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setSelectedIndex(index);
  };

  return (
    <section
      className={styles.library}
      aria-label="3D bookshelf"
      data-lit={lightsOn}
    >
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.dustMotes} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((mote) => (
          <span key={mote} style={{ "--mote": mote } as CSSProperties} />
        ))}
      </div>
      <header className={styles.libraryHeader}>
        <div>
          <p className={styles.eyebrow}>
            <span /> The personal collection
          </p>
          <h2>
            A life <em>between covers.</em>
          </h2>
          <p className={styles.description}>
            A quiet corner. A good book. A little warm light.
          </p>
        </div>
        <div className={styles.headerAside}>
          <div className={styles.pendants} aria-hidden="true">
            {[48, 66, 38].map((length, index) => (
              <span
                key={length}
                className={styles.pendant}
                style={
                  {
                    "--cord-length": `${length}px`,
                    "--lamp-delay": `${index * -2}s`,
                  } as CSSProperties
                }
              >
                <span className={styles.cord} />
                <span className={styles.socket} />
                <span className={styles.bulb}>
                  <span className={styles.filament} />
                </span>
              </span>
            ))}
          </div>
          <div className={styles.collectionCount}>
            <strong>{String(books.length).padStart(2, "0")}</strong>
            <span>
              {books.length === 1 ? "volume" : "volumes"} · {label}
            </span>
          </div>
        </div>
      </header>

      <div className={styles.shelfIntro}>
        <span>
          <span className={styles.liveDot} />{" "}
          {lightsOn ? "The lamplit collection" : "A shelf to explore"}
        </span>
        <button
          type="button"
          className={styles.lightSwitch}
          onClick={toggleLights}
          aria-pressed={lightsOn}
          aria-label="Reading lights"
        >
          <FiSun aria-hidden="true" />
          <span>Reading lights</span>
          <span className={styles.switchTrack} aria-hidden="true">
            <span />
          </span>
        </button>
      </div>

      <div className={styles.shelves}>
        {books.map((book, index) => (
          <article
            key={book.id}
            className={styles.slot}
            style={
              {
                "--arrival-delay": `${Math.min(index, 12) * 45}ms`,
              } as CSSProperties
            }
          >
            <button
              type="button"
              className={styles.stage}
              onClick={(event) => openBook(index, event.currentTarget)}
              onPointerMove={tiltBook}
              onPointerLeave={resetBookTilt}
              onPointerCancel={resetBookTilt}
              aria-label={`Take a closer look at ${book.title}`}
              aria-haspopup="dialog"
            >
              <span className={styles.shelfLight} aria-hidden="true" />
              <span className={styles.bookShadow} aria-hidden="true" />
              <BookObject book={book} />
              <span className={styles.inspect} aria-hidden="true">
                <FiArrowUpRight />
              </span>
            </button>
            <div className={styles.bookCaption}>
              <p>{book.authors.join(", ") || "Author unknown"}</p>
              <h3>
                <button
                  type="button"
                  onClick={(event) => openBook(index, event.currentTarget)}
                >
                  {book.title}
                </button>
              </h3>
              <span className={styles.captionMeta}>
                {book.userRating != null && book.userRating > 0 ? (
                  <span>
                    <span className={styles.star} aria-hidden="true">
                      ★
                    </span>{" "}
                    {book.userRating.toFixed(1)}{" "}
                    <span className={styles.ratingLabel}>my rating</span>
                  </span>
                ) : (
                  <span>{STATUS_LABELS[book.statusId]}</span>
                )}
                {book.pages != null && (
                  <span>{book.pages.toLocaleString()} pp.</span>
                )}
              </span>
            </div>
          </article>
        ))}
      </div>

      <footer className={styles.libraryFooter}>
        <span>There&apos;s always room for another story.</span>
        <span>Select a cover. Stay a little longer.</span>
      </footer>

      {selectedBook && selectedIndex != null && (
        <BookDetails
          book={selectedBook}
          position={selectedIndex}
          total={books.length}
          returnFocusTo={openerRef.current}
          onClose={() => setSelectedIndex(null)}
          onPrevious={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
          onNext={() =>
            setSelectedIndex(Math.min(books.length - 1, selectedIndex + 1))
          }
        />
      )}
    </section>
  );
}
