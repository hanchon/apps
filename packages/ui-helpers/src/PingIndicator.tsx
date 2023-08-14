export const PingIndicator = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="relative inline-flex">
      <span className="absolute right-0 top-0 flex h-3 w-3">
        <span className="bg-red absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
        <span className="bg-red relative inline-flex h-3 w-3 rounded-full"></span>
      </span>
      {children}
    </div>
  );
};
