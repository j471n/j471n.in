import { HardcoverBook, BookStatusId, HardcoverProfile } from "./types";

const HARDCOVER_GRAPHQL_URL = "https://api.hardcover.app/v1/graphql";

/* ---------- internal GraphQL helper ---------- */

async function hardcoverQuery<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(HARDCOVER_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.HARDCOVER_API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Hardcover API responded with status ${res.status}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}

/* ---------- helpers ---------- */

async function getMyUserId(): Promise<number> {
  const data = await hardcoverQuery<{
    me: Array<{ id: number }> | { id: number };
  }>(`query { me { id } }`);

  const me = data.me;
  return Array.isArray(me) ? me[0].id : (me as { id: number }).id;
}

/* ---------- raw response shapes ---------- */

type RawUserBook = {
  status_id: number;
  updated_at: string | null;
  rating: number | null;
  dates_read: Array<{ finished_at: string | null }>;
  book: {
    id: number;
    title: string | null;
    subtitle: string | null;
    slug: string | null;
    pages: number | null;
    release_year: number | null;
    rating: number | null;
    image: { url: string } | null;
    contributions: Array<{ author: { name: string } }>;
  };
};

/* ---------- public API ---------- */

export async function getMyBooks(): Promise<HardcoverBook[]> {
  const userId = await getMyUserId();

  const data = await hardcoverQuery<{ user_books: RawUserBook[] }>(
    `query GetMyBooks($userId: Int!) {
      user_books(
        where: {
          user_id: { _eq: $userId }
          status_id: { _in: [1, 2, 3] }
        }
        order_by: { updated_at: desc }
      ) {
        status_id
        updated_at
        rating
        book {
          id
          title
          subtitle
          slug
          pages
          release_year
          rating
          image { url }
          contributions {
            author { name }
          }
        }
      }
    }`,
    { userId },
  );

  return data.user_books.map((ub) => ({
    statusId: ub.status_id as BookStatusId,
    id: ub.book.id,
    title: ub.book.title ?? "",
    subtitle: ub.book.subtitle ?? null,
    slug: ub.book.slug ?? "",
    pages: ub.book.pages ?? null,
    releaseYear: ub.book.release_year ?? null,
    rating: ub.book.rating ?? null,
    coverUrl: ub.book.image?.url ?? null,
    authors: ub.book.contributions.map((c) => c.author.name),
    userRating: ub.rating ?? null,
    updatedAt: ub.updated_at ?? null,
    finishedAt: ub.dates_read?.[0]?.finished_at ?? null,
  }));
}

/* ---------- profile + stats ---------- */

type RawGoal = {
  goal: number;
  progress: number;
  metric: string;
  state: string;
  start_date: string;
  end_date: string;
};

type RawProfile = {
  me: Array<{
    username: string;
    name: string | null;
    books_count: number;
    goals: RawGoal[];
  }>;
};

export async function getMyProfile(): Promise<HardcoverProfile> {
  const currentYear = new Date().getFullYear();

  const data = await hardcoverQuery<RawProfile>(
    `query GetMyProfile {
      me {
        username
        name
        books_count
        goals(
          where: {
            metric: { _eq: "books" }
            start_date: { _gte: "${currentYear}-01-01" }
            end_date:   { _lte: "${currentYear}-12-31" }
          }
          order_by: { start_date: desc }
          limit: 1
        ) {
          goal
          progress
          metric
          state
          start_date
          end_date
        }
      }
    }`,
  );

  const me = data.me[0];
  const goal = me.goals[0] ?? null;

  return {
    username: me.username,
    name: me.name ?? me.username,
    booksCount: me.books_count,
    currentYearGoal: goal
      ? {
          target: goal.goal,
          progress: Math.round(goal.progress),
          metric: goal.metric,
          state: goal.state,
          year: currentYear,
        }
      : null,
  };
}
