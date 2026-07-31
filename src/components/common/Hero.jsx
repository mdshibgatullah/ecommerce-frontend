import { useEffect, useState } from "react";
// import '../assets/'
import hero1 from "../../assets/images/hero1.png";
import hero2 from "../../assets/images/hero2.png";
import hero3 from "../../assets/images/hero3.png";

const slides = [
  {
    bg: hero1,
    title: "WOMEN'S COLLECTION",
    subtitle: "Explore elegant and modern women's fashion.",
  },
  {
    bg: hero2,
    title: "MEN'S COLLECTION",
    subtitle: "Premium fashion for modern gentlemen.",
  },
  {
    bg: hero3,
    title: "BABY COLLECTION",
    subtitle: "Cute and stylish outfits for kids.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${slides[index].bg})`,
      }}
    >
      <div className="container hero-content">
        <div className="hero-left">
          <span className="discover">
            ✦ Discover Your Style
          </span>

          <h1>{slides[index].title}</h1>

          <p>{slides[index].subtitle}</p>

          <button className="hero-btn">
            Shop Now →
          </button>
        </div>
      </div>
    </section>
  );
}

