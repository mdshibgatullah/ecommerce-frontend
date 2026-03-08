import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import HeroImg1 from "../../assets/images/HeroImg1.png";
import HeroImg2 from "../../assets/images/HeroImg2.png";
import HeroImg3 from "../../assets/images/HeroImg3.png";

const Hero = () => {

  const slides = [
    {
      title: "MEN'S FASHION",
      description:
        "Upgrade your wardrobe with premium men's shirts, trousers and accessories designed for confidence and comfort.",
      img: HeroImg1,
      button: "Shop Men",
    },
    {
      title: "WOMEN'S COLLECTION",
      description:
        "Explore elegant and modern women's fashion. Discover dresses, tops and outfits designed to elevate your style.",
      img: HeroImg2,
      button: "Shop Women",
    },
    {
      title: "KIDS COLLECTION",
      description:
        "Cute, comfortable and stylish clothing for kids. Discover colorful outfits perfect for everyday adventures.",
      img: HeroImg3,
      button: "Shop Kids",
    },
  ];

  return (
    <section className="hero-section">
      <div className="container">

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500 }}
          loop={true}
          pagination={{ clickable: true }}
        >

          {slides.map((slide, index) => (

            <SwiperSlide key={index}>
              <div className="row align-items-center hero-row">

                <div className="col-lg-6 text-white hero-content pt-5 pt-lg-0">

                  <h1>{slide.title}</h1>

                  <p className="pb-3">{slide.description}</p>

                  <a href="#" className="hero-btn">
                    {slide.button} →
                  </a>

                </div>

                <div className="col-lg-6 hero-img-box pt-5">

                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="hero-img"
                  />

                </div>

              </div>
            </SwiperSlide>

          ))}

        </Swiper>

      </div>
    </section>
  );
};

export default Hero;