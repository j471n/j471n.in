type Props = {
  children?: string | React.ReactNode;
};

export default function Code(props: Props) {
  return (
    <>
      {typeof props.children === "string" ? (
        <code className="!bg-gray-500 p-0.5 rounded before:text-gray-500 after:text-gray-500 text-white">
          {props.children}
        </code>
      ) : (
        <code>{props.children}</code>
      )}
    </>
  );
}
