"use client";
import React, { useState } from "react";
import styles from "./formsection.module.css";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FormSection = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        // Login successful
        const data = await response.json();
        const accessToken = data.access_token;
        localStorage.setItem("accessToken", accessToken);
        setLoading(false);
        toast.success("Login successful");
        router?.push("/dashboard");
      } else {
        // Login failed
        const data = await response.json();
        setError(data.error);
        setLoading(false);
        toast.error("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
      setLoading(false);
      toast.error("An error occurred. Please try again later.");
    }
  };
  return (
    <div className={styles?.formsection}>
      <h1 style={{ fontSize: "36px", fontWeight: 700 }}> Sign in</h1>
      <p style={{ fontSize: "16px", fontWeight: 400, marginTop: "5px" }}>
        Sign in to your account
      </p>
      <div className={styles?.iconsection}>
        <div className={styles?.icongoogle}>
          <Image
            src={"/google-icon.png"}
            width={10}
            height={10}
            quality={100}
          />{" "}
          <p>Sign in with Google</p>
        </div>
        <div className={styles?.icongoogle}>
          <Image src={"/apple.png"} width={10} height={10} quality={100} />
          <p>Sign in with Apple</p>
        </div>
      </div>
      <div className={styles?.loginformsection}>
        <form className={styles?.loginform} onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e?.target?.value);
            }}
          ></input>
          <br></br>
          <label>password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e?.target?.value);
            }}
          ></input>
          <span>Forgot password</span>
          <button type="submit">{loading ? "Signing..." : "Sign in"}</button>
        </form>
      </div>
      <p className={styles?.registerLink}>
        Dont have an account? <span> Register here</span>
      </p>
      <div className={styles?.iconslist}>
        <Link href={""}>
          {" "}
          <Image
            src="/git_round.png"
            width={28}
            height={28}
            className={styles?.ImageStyle}
          />
        </Link>
        <Link href={""}>
          {" "}
          <Image
            src="/twitter_round.png"
            width={28}
            height={28}
            className={styles?.ImageStyle}
          />
        </Link>
        <Link href={""}>
          {" "}
          <Image
            src="/link.png"
            width={28}
            height={28}
            className={styles?.ImageStyle}
          />
        </Link>

        <Link href={""}>
          {" "}
          <Image
            src="/dis.png"
            width={33}
            height={33}
            className={styles?.ImageStyle}
          />
        </Link>
      </div>
      <div style={{ margin: "30px" }}>
        <h5>Credentails</h5>
        <p>john@mail.com</p>
        <p>changeme</p>
      </div>
    </div>
  );
};

export default FormSection;
