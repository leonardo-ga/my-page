import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

const items = gsap.utils.toArray(".timeline-item");
const progressLines = gsap.utils.toArray(".timeline-progress");

// cycle through the progress lines
progressLines.forEach((progressLine) => {
  const mapCounter = new Map();
  let count = -1;

  // cycle through the items
  items.forEach((item, index) => {
    if(progressLine.parentNode === item.parentNode) {
      // animate items
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const lineHeight = item.offsetTop + item.offsetHeight; // full height to this item
      // Shrink to previous item's bottom, or 0 if first item
      count++;
      const prevHeight = count === 0 ? 0 : mapCounter.get((count - 1).toString());
      // animate line
      mapCounter.set(count.toString(), lineHeight);
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        end: "bottom 85%",
        onEnter: () => gsap.to(progressLine, { height: lineHeight, duration: 0.3 }),
        onLeaveBack: () => gsap.to(progressLine, { height: prevHeight, duration: 0.3 }),
        //markers: true
      });
    }
  });
})
