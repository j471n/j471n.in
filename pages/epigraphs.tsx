import { useState, useMemo } from "react";
import { useDebounce } from "@hooks/useDebounce";
import { IEpigraph, EpigraphSourceType } from "@lib/interface/sanity";
import Metadata from "@components/MetaData";
import PageHeader from "@components/PageHeader";
import EpigraphCard from "@components/EpigraphCard";
import { getAllEpigraphs } from "@lib/sanityContent";
import pageMeta from "@content/meta";
import { motion } from "framer-motion";
import { TIME_IN_SECONDS } from "@utils/utils";

const SOURCE_TYPE_LABELS: Record<EpigraphSourceType | "all", string> = {
  all: "All",
  book: "Books",
  movie: "Movies",
  tvShow: "TV Shows",
  person: "People",
  song: "Songs",
  podcast: "Podcasts",
  other: "Other",
};

export default function Epigraphs({ epigraphs }: { epigraphs: IEpigraph[] }) {
  const [activeType, setActiveType] = useState<EpigraphSourceType | "all">(
    "all",
  );
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  // Derive which source types actually exist in the data
  const availableTypes = useMemo<Array<EpigraphSourceType | "all">>(() => {
    const types = new Set(epigraphs.map((e) => e.sourceType));
    const ordered: Array<EpigraphSourceType | "all"> = [
      "all",
      "book",
      "movie",
      "tvShow",
      "person",
      "song",
      "podcast",
      "other",
    ];
    return ordered.filter(
      (t) => t === "all" || types.has(t as EpigraphSourceType),
    );
  }, [epigraphs]);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return epigraphs.filter((m) => {
      const typeMatch = activeType === "all" || m.sourceType === activeType;
      if (!typeMatch) return false;
      if (!q) return true;
      return (
        m.quote.toLowerCase().includes(q) ||
        m.sourceTitle.toLowerCase().includes(q) ||
        (m.sourceMeta?.toLowerCase().includes(q) ?? false) ||
        (m.speaker?.toLowerCase().includes(q) ?? false) ||
        (m.tags?.some((t) => t.toLowerCase().includes(q)) ?? false)
      );
    });
  }, [epigraphs, activeType, debouncedSearch]);

  return (
    <>
      <Metadata
        title={pageMeta.epigraphs.title}
        description={pageMeta.epigraphs.description}
        previewImage={pageMeta.epigraphs.image}
        keywords={pageMeta.epigraphs.keywords}
      />

      <PageHeader
        watermark="epigraphs"
        eyebrow="Epigraphs — 001"
        title="Epigraphs"
        description={`Quotes, passages, and stanzas that caught my eye. ${epigraphs.length} collected so far.`}
        className="pb-8"
      >
        {/* ── Filter Controls ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="search"
              placeholder="Search epigraphs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-darkSecondary border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 px-4 py-2 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-colors"
            />
          </div>

          {/* Source type filter pills */}
          <div className="flex flex-wrap gap-2">
            {availableTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`font-mono text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 border transition-colors ${
                  activeType === type
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                    : "bg-transparent text-gray-500 dark:text-gray-500 border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {SOURCE_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        {(debouncedSearch || activeType !== "all") && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[10px] tracking-widest uppercase text-gray-400 dark:text-gray-600 mb-6"
          >
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </motion.p>
        )}

        {/* ── List ── */}
        {filtered.length > 0 ? (
          <motion.div
            key={`${activeType}-${debouncedSearch}`}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="divide-y divide-gray-400/20 dark:divide-neutral-700 pb-16"
          >
            {filtered.map((epigraph, i) => (
              <EpigraphCard key={epigraph._id} epigraph={epigraph} index={i} />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center pb-16">
            <span className="font-serif text-7xl text-gray-200 dark:text-neutral-800 select-none leading-none">
              &ldquo;
            </span>
            <p className="mt-6 text-gray-500 dark:text-gray-500 text-sm">
              No epigraphs match your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveType("all");
              }}
              className="mt-4 font-mono text-[10px] tracking-widest uppercase text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </PageHeader>
    </>
  );
}

export async function getStaticProps() {
  const epigraphs = await getAllEpigraphs();

  return {
    props: { epigraphs },
    revalidate: TIME_IN_SECONDS.ONE_DAY, // revalidate every 5 minutes
  };
}
