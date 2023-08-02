export const Card = ({ children }: { children: JSX.Element }) => {
  return (
    <section className="space-y-8 rounded-lg bg-darGray800 px-5 py-7">
      {children}
    </section>
  );
};
