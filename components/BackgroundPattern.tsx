"use client";

import React from "react";

export default function BackgroundPattern() {
  const [offsetY, setOffsetY] = React.useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY * 0.3);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="absolute inset-0 -z-10 h-full bg-transparent mix-blend-overlay backdrop-blur-xs 
                  bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] 
                  bg-[size:6rem_4rem] 
                  [mask-image:linear-gradient(to_bottom_left,white,transparent)] 
                  [-webkit-mask-image:linear-gradient(to_bottom_left,white,transparent)]"
      style={{ backgroundPosition: `0px ${offsetY}px` }}
    />
  );
}
