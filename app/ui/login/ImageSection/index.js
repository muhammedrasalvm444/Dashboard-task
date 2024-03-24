import React from "react";
import styles from "./imagesection.module.css";
import Image from "next/image";
import Link from "next/link";

const ImageSection = () => {
  return (
    <>
      <div className={styles?.imageSection}>
        <img src={"/leftside.png"} style={{ height: "100vh", width: "100%" }} />
      </div>
      <div className={styles?.icon}>
        <div
          style={{
            width: "40px", // Adjust width as needed
            height: "40px", // Adjust height as needed
            backgroundColor: "white",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Link href={"/"}>
            <img
              src={"/vector.png"}
              style={{
                width: "100%", // Make sure image fills the container
                height: "100%", // Make sure image fills the container
                objectFit: "contain", // Cover the entire container with the image
              }}
            />
          </Link>
        </div>
      </div>
      <h4 className={styles?.heading}>BASE</h4>
      <div className={styles?.iconslist}>
        <Link href={""}>
          {" "}
          <Image src="/git.png" width={28} height={28} />
        </Link>
        <Link href={""}>
          {" "}
          <Image src="/linkedin.png" width={28} height={28} />
        </Link>
        <Link href={""}>
          {" "}
          <Image src="/twitter.png" width={28} height={28} />
        </Link>
        <Link href={""}>
          {" "}
          <Image src="/discord.png" width={28} height={28} />
        </Link>
      </div>
    </>
  );
};

export default ImageSection;
