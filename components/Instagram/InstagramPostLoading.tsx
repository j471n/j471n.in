import React from "react";

export default function InstagramPostLoading({ count }: { count: number }) {
  return (
    <>
      {Array.from(Array(count).keys()).map((item) => {
        return (
          <div
            key={item}
            style={{
              animationDelay: `calc(${item} * 200ms)`,
            }}
            className="aspect-square bg-neutral-300 dark:bg-neutral-700 animate-pulse "
          />
        );
      })}
    </>
  );
}
