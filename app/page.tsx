export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-5 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 dark:bg-gray-700">
      <div className="flex w-full max-w-screen-sm flex-col gap-3 rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-600 ">
        {['hyeppy', 'Me', 'You', 'Yourself'].map((person, index) => (
          <div
            key="{index}"
            className="group flex items-center gap-5 rounded-xl border-b-2  p-2.5 pb-5 last:border-0 last:pb-0"
          >
            <div className="btn" />
            <span className="text-lg font-medium group-hover:text-red-400">
              {person}
            </span>
            <input type="text" />

            <a href="">tawilwind @layer link</a>

            <div className="relative flex size-6 items-center justify-center rounded-full bg-red-500 text-white">
              <span>{index}</span>
              <div className="absolute size-6 animate-ping rounded-full bg-red-500" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
