export default function Home() {
    return (
        <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700">
            <div
                className="bg-white w-full shadow-lg p-5 rounded-3xl max-w-screen-sm dark:bg-gray-600
            flex flex-col gap-2 md:flex-row"
            >
                <input
                    className="w-full rounded-full h-12 bg-gray-200 pl-5 outline-none ring ring-transparent focus:ring-green-500 focus:ring-offset-2 transition-shadow placeholder:drop-shadow invalid:focus:ring-red-500 peer"
                    required
                    type="email"
                    placeholder="Email Address"
                />
                <span className="text-red-500 font-medium hidden peer-invalid:block">
                    Email is required.
                </span>
                <button className="bg-gradient-to-tr from-cyan-500 to-purple-400 via-pink-300 bg-opacity-80 text-white py-2 rounded-full active:scale-90 transition-transform font-medium focus:scale-90 md:px-10 peer-invalid:from-red-500 peer-invalid:bg-orange-400">
                    Log in
                </button>
            </div>
        </main>
    );
}
