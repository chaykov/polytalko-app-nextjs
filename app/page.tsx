import BackgroundPattern from "../components/BackgroundPattern";
import AuthControls from "@/components/AuthControls";

export default function LandingPage() {
  return (
    <div className="relative isolate overflow-hidden bg-linear-to-br from-indigo-700 to-indigo-900 h-screen">
      <BackgroundPattern />
      <div className="flex items-center min-h-full justify-center flex-col">
        <div className="mx-auto max-w-2xl text-center p-6 sm:p-12">
          <h1 className="text-7xl md:text-[92px] font-bold text-white mb-12">
            PolyTalko
          </h1>
          <h2 className="text-balance font-semibold tracking-tight text-white text-4xl md:text-5xl">
            Get some new friends from all over the world.
          </h2>
          <p className="mx-auto mt-6 max-w-sm md:max-w-xl text-pretty text-md/8 md:text-lg/8 text-indigo-200">
            🌍 PolyTalko – where the world connects! Want to sharpen your
            language skills, meet people from different cultures, and make new
            friends? 🚀 PolyTalko is a vibrant space full of positive energy
            where you can learn, share experiences, and have a great time. Join
            us and explore the world together! 🌏✨
          </p>

          {/* CTA BUTTON */}
          <div className="mt-6 md:mt-10 flex items-center justify-center gap-x-6">
            <AuthControls />
          </div>
        </div>
      </div>
    </div>
  );
}
