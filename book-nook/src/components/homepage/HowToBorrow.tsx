

const ExtraSections = () => (
  <>
    {/* Simple guide to the borrowing flow */}
    <section className="bg-white ">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-18">
        {/* Section heading */}
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-11">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8c7350]">Your next chapter starts here</p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#263b30] sm:text-4xl">How borrowing works</h2>
          <p className="mt-3 text-sm leading-6 text-[#68736a] sm:text-base">A few simple steps take you from browsing the shelves to enjoying your next great read.</p>
        </div>

        {/* Three steps from finding a book to reading it */}
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { number: "01", title: "Find a book", text: "Browse the collection and choose a story you would love to read." },
            { number: "02", title: "Request to borrow", text: "Open a book’s details and send a borrow request to its owner." },
            { number: "03", title: "Enjoy the read", text: "Keep track of your borrowed books from your personal borrow list." },
          ].map((step) => (
            <article key={step.number} className="rounded-2xl border border-[#e9e2d8] bg-[#fbf8f1] p-6 sm:p-7">
              <span className="flex size-11 items-center justify-center rounded-full bg-[#068a3f] font-serif text-lg font-bold text-white">{step.number}</span>
              <h3 className="mt-5 font-serif text-xl font-bold text-[#263b30]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#68736a]">{step.text}</p>
            </article>
          ))}
        </div>

        
      </div>
    </section>

  </>
);

export default ExtraSections;
