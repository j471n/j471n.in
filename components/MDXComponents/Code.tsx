type Props = {
  children?: string | React.ReactNode;
};

export default function Code(props: Props) {
  return (
    <>
      {typeof props.children === "string" ? (
        <code className="bg-gray-300 dark:bg-darkSecondary text-black dark:text-white p-0.5 rounded before:text-gray-500 after:text-gray-500 ">
          {props.children}
        </code>
      ) : (
        <code>{props.children}</code>
      )}
    </>
  );
}
