export default function BackgroundPattern() {
  return (
    <div
      className="absolute inset-0 -z-10 h-full bg-transparent mix-blend-overlay backdrop-blur-sm 
                  bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] 
                  bg-[size:6rem_4rem] 
                  [mask-image:linear-gradient(to_bottom_left,white,transparent)] 
                  [-webkit-mask-image:linear-gradient(to_bottom_left,white,transparent)]"
    />
  );
}
