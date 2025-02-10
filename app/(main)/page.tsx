import BackgroundPattern from "./_components/BackgroundPattern";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-700 to-indigo-900 h-screen">
      <BackgroundPattern />
      <div className="flex items-center min-h-full justify-center flex-col">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-7xl text-white mb-12">PolyTalko</h1>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Get some new friends from all over the world.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-indigo-200">
            🌍 PolyTalko – where the world connects! Want to sharpen your
            language skills, meet people from different cultures, and make new
            friends? 🚀 PolyTalko is a vibrant space full of positive energy
            where you can learn, share experiences, and have a great time. Join
            us and explore the world together! 🌏✨
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </a>
            <a href="#" className="text-sm/6 font-semibold text-white">
              Learn more <span aria-hidden="true">&#8594;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
