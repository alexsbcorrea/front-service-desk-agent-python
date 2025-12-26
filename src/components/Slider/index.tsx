"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { BsFillPlayFill, BsPause } from "react-icons/bs";

export interface SliderProps {
  onClick?: () => void;
}

const images = [{ file: "img1.jpg" }, { file: "img2.jpg" }];

export default function Slider(props: SliderProps) {
  const [slide, setSlide] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(false);

  function PreviousSlide() {
    Pause();
    if (slide == 0) {
      setSlide(images.length - 1);
      return;
    }
    setSlide(slide - 1);
    return;
  }
  function NextSlide() {
    Pause();
    if (slide == images.length - 1) {
      setSlide(0);
      return;
    }
    setSlide(slide + 1);
    return;
  }

  function NextSlideAuto() {
    if (slide == images.length - 1) {
      setSlide(0);
      return;
    }
    setSlide(slide + 1);
    return;
  }

  useEffect(() => {
    if (pause == false) {
      const timer = setTimeout(NextSlideAuto, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [slide, pause]);

  function Play() {
    setPause(false);
    setSlide(0);
  }

  function Pause() {
    setPause(true);
  }

  function SelectItem(index: number) {
    Pause();
    setSlide(index);
    setTimeout(() => {
      setSlide(index);
    }, 3000);
  }

  return (
    <section className={styles.section}>
      <div className={styles.left} onClick={() => PreviousSlide()}>
        <FiArrowLeftCircle size={50} color={"#fff"} />
      </div>
      <div className={styles.image}>
        <Image
          src={require(`../../../public/${images[slide].file}`)}
          width={1600}
          height={1204}
          alt={`Slide ${slide}`}
          className={styles.img}
        />
      </div>
      <div className={styles.right} onClick={() => NextSlide()}>
        <FiArrowRightCircle size={50} color={"#fff"} />
      </div>
      <div className={styles.description}>
        <div>
          {/* <Image
            src={require("../../../public/logo_centro.png")}
            alt=""
            width={150}
          /> */}
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.playContainer}>
          <div className={styles.play} onClick={() => Play()}>
            {pause == true && (
              <CiPlay1 size={25} color={"#fff"} cursor={"pointer"} />
            )}
          </div>
          <div className={styles.play} onClick={() => Pause()}>
            {pause == false && (
              <CiPause1 size={25} color={"#fff"} cursor={"pointer"} />
            )}
          </div>
        </div>

        {images.map((item, index) => (
          <div
            className={index == slide ? styles["active"] : styles["inactive"]}
            onClick={() => SelectItem(index)}
            key={index}
          ></div>
        ))}
      </div>
    </section>
  );
}
