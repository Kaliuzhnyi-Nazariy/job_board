import React, { useState } from "react";
import "./styles.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import SliderItem from "./SliderItem";

// import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

export default function App() {
  const [slidesCount, setSlidesCount] = useState(0);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setLoaded(true);
      setSlidesCount(slider.track.details.slides.length);
    },
    loop: true,
    slides: {
      origin: "center",
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          origin: "auto",
          perView: 2,
          spacing: 16,
        },
      },
      "(min-width: 1440px)": {
        slides: {
          origin: "auto",
          perView: 3,
          spacing: 24,
        },
      },
    },
  });

  return (
    <>
      <div className="navigation-wrapper mt-12.5">
        <div ref={sliderRef} className="keen-slider">
          <SliderItem
            comment="Mauris eget lorem odio. Mauris convallis justo molestie
                metus aliquam lacinia. Suspendisse ut dui vulputate augue
                condimentum ornare. Morbi vitae tristique ante."
            name="Bessie Cooper"
            job="Creative Director"
          />
          <SliderItem
            comment="Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci. Duis vestibulum bibendum dapibus."
            name="Jane Cooper"
            job="Photographer"
          />
          <SliderItem
            comment="Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est."
            name="Robert Fox"
            job="UI/UX Designer"
          />

          <SliderItem
            comment="Mauris eget lorem odio. Mauris convallis justo molestie
                metus aliquam lacinia. Suspendisse ut dui vulputate augue
                condimentum ornare. Morbi vitae tristique ante."
            name="Bessie Cooper"
            job="Creative Director"
          />
          <SliderItem
            comment="Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci. Duis vestibulum bibendum dapibus."
            name="Jane Cooper"
            job="Photographer"
          />
          <SliderItem
            comment="Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est."
            name="Robert Fox"
            job="UI/UX Designer"
          />
        </div>
        {loaded && slidesCount > 0 && (
          <>
            <Arrow
              left
              onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
            />

            <Arrow
              onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
            />
          </>
        )}
      </div>
      {loaded && loaded && slidesCount > 0 && (
        <div className="dots">
          {[...Array(slidesCount).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}

function Arrow(props: {
  left?: boolean;
  onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
}) {
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left " : "arrow--right "}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
