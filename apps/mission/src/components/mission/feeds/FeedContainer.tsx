const FeedContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <section className="mb-4 rounded border-b border-darkPearl border-opacity-80 bg-darkGray2 p-2 pb-5 last:border-b-0 hover:bg-darkGray2Opacity">
      {children}
    </section>
  );
};

export default FeedContainer;