import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Typography } from "./components";
import {CloseIcon} from './assets/svg/close-icon'

function App() {
  const [isFirstBannerVisible, setIsFirstBannerVisible] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [hasHiddenElements, setHasHiddenElements] = useState(false);

  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const targetDivRef = useRef(null);
  const secondDivRef = useRef(null);

  console.log({ isDivVisible: isFirstBannerVisible });

  useEffect(() => {

    const target = targetDivRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        // entries is an array of observed elements
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Target div is scrolled out of the viewport
            setIsFirstBannerVisible(false);
          } else {
            // Target div is in the viewport
            setIsFirstBannerVisible(true);
          }
        });
      },
      { threshold: 0 }
    );

    if (targetDivRef.current) {
      observer.observe(targetDivRef.current);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let hasHidden = false;

        entries.forEach((entry) => {
          const child = entry.target as HTMLDivElement;

          if (entry.isIntersecting) {
            child.style.visibility = "visible";
          } else {
            hasHidden = true;
            child.style.visibility = "hidden";
          }
        });

        setHasHiddenElements(hasHidden);
      },
      { threshold: 1 }
    );

    const children = contentWrapperRef.current!.querySelectorAll(
      ".top-banner__content > *"
    );

    children.forEach((child) => observer.observe(child));

    return () => {
      children.forEach((child) => {
        observer.unobserve(child);
      });
    };
  }, []);



  useEffect(() => {
    const modalShownBefore = localStorage.getItem('modalShownBefore');
    if (!modalShownBefore) {
      setShowModal(true);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem('modalShownBefore', 'true');
  };


  return (
    <div className="container">
      {/* Top Banner Component - Start */}
      <div ref={targetDivRef} className="top-banner">
        <img src="./top-banner-bg.png" alt="Banner Logo" />

        <div ref={contentWrapperRef} className="top-banner__content-wrapper">
          <div className="top-banner__content">
            <Typography variant="ui-text">Black Friday</Typography>

            <Typography color="yellow" variant="ui-text">
              10%OFF
            </Typography>

            <div className="flex-start">
              <Typography variant="ui-text">
                Use code
                <Typography as="span" color="yellow" variant="ui-text">
                  10FRIDAY
                </Typography>
              </Typography>
            </div>
          </div>
        </div>

        <button className="button">Shop now</button>
      </div>

      {/* Top Banner Component - End */}
      {showModal && (

        <div ref={secondDivRef}  className={`black-friday-banner ${!isFirstBannerVisible && "-visible"}`} >
          <div className ="black-friday-banner-container">
            <div className="black-friday-banner-close" onClick={closeModal}>
              <CloseIcon />
            </div>
            <div className="black-friday-banner-content">
              <div className="black-friday-banner-title">Black Friday</div>
              <div className="offer">10% OFF</div>
              <span className="promo-description">
              Use code <span>10FRIDAY</span> at checkout
              </span>
              <div className="shop-btn">
              Shop now through Monday
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
