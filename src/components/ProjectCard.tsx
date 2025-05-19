export default function ProjectCard() {
  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
      <h2 className="text-md font-bold mb-5">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 lg:gap-8">
        {/* Pages Created */}
        <a
          href="#"
          className="flex flex-col rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50/50 active:border-purple-200 lg:col-span-6"
        >
          <div className="flex grow items-center justify-between p-5">
            <dl>
            <dt className="text-sm font-bold">
  <div className="flex items-center gap-1">
    Pages Created
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-zinc-400"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </div>
</dt>

              <dd className="text-2xl font-bold">23</dd>
            </dl>
            <div className="flex items-center text-sm font-medium text-zinc-300">
              {/* Document Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6M12 3v2.25M6.75 3h10.5A2.25 2.25 0 0119.5 5.25v13.5A2.25 2.25 0 0117.25 21H6.75A2.25 2.25 0 014.5 18.75V5.25A2.25 2.25 0 016.75 3z" />
</svg>

            </div>
          </div>
        </a>

        {/* Contributors */}
        <a
          href="#"
          className="flex flex-col rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50/50 active:border-purple-200 lg:col-span-6"
        >
          <div className="flex grow items-center justify-between p-5">
            <dl>
          
              <dt className="text-sm font-bold">
  <div className="flex items-center gap-1">
Contributors    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-zinc-400"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </div>

              </dt>
              <dd className="text-2xl font-bold">5</dd>
            </dl>
            <div className="flex items-center text-sm font-medium text-zinc-300">
              {/* Team Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11c1.656 0 3-1.57 3-3.5S17.656 4 16 4s-3 1.57-3 3.5S14.344 11 16 11zm-8 0c1.656 0 3-1.57 3-3.5S9.656 4 8 4 5 5.57 5 7.5 6.344 11 8 11zm0 2c-2.67 0-8 1.34-8 4v1.5A1.5 1.5 0 001.5 20h13a1.5 1.5 0 001.5-1.5V17c0-2.66-5.33-4-8-4zm8 0c-.65 0-1.26.08-1.81.22A5.99 5.99 0 0121 17v1.5a1.5 1.5 0 001.5 1.5h.5a.5.5 0 00.5-.5V17c0-2.66-5.33-4-8-4z" />
</svg>

            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
