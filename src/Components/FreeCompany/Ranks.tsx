export const Ranks = () => {
  return (
    <section className="grid gap-4 pb-8 min-h-[calc(100vh-448px)]">
      <nav className="navbar grid bg-base-100 rounded-lg h-fit">
        <button className="btn hover:bg-primary gap-2 flex-col py-4 h-fit">
          Pull Character data{" "}
          <span className="lowercase font-normal opacity-60">
            (may take a while)
          </span>
        </button>
      </nav>
    </section>
  );
};
