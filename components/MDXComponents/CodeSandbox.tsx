export default function Codepen({
  id,
  hideNavigation = true,
}: {
  id: string;
  hideNavigation: boolean;
}) {
  return (
    <div className="my-3 print:hidden">
      <h3>Code Sandbox</h3>
      <iframe
        className="w-full h-[500px] border-0 rounded overflow-hidden"
        src={`https://codesandbox.io/embed/${id}?fontsize=14&theme=dark&hidenavigation=${
          hideNavigation ? 1 : 0
        }`}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
}
