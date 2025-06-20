import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import About from "../components/about";
import Deals from "../components/deals";
import Services from "../components/services";
import Review from "../components/review";
import Insta from "../components/insta";
import Form from "../components/form";
import scrollIcon from "../assets/icons/topArrowIcon.png";

import Footer from "../components/footer";
import Hero from "../components/hero";

const HomePage = () => {
  const [showButton, setShowButton] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get user info from localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
      // If just logged in, show success message
      if (window.sessionStorage.getItem("justLoggedIn")) {
        setShowLoginSuccess(true);
        window.sessionStorage.removeItem("justLoggedIn");
        setTimeout(() => setShowLoginSuccess(false), 3000);
      }
    }
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLogoutSuccess(true);
    setTimeout(() => setShowLogoutSuccess(false), 3000);
    router.push("/");
  };

  return (
    <div className="dark:bg-bgDark">
      {/* User info/login button */}
      <div
        style={{
          position: "fixed",
          top: "100px", // moved further down
          right: "60px",
          zIndex: 1000,
        }}
      >
        {user ? (
          <div
            style={{
              background: "#e0f2fe",
              color: "#0369a1",
              padding: "8px 80px 8px 20px",
              borderRadius: "20px",
              fontWeight: 600,
              fontSize: "16px",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minWidth: 360,
              gap: 10,
            }}
          >
            <span>Welcome, {user.displayName || user.email}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "4px 12px",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: 14,
                marginLeft: 60,
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            style={{
              background: "#2563eb",
              color: "white",
              padding: "10px 24px",
              borderRadius: "20px",
              fontWeight: 600,
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
            }}
            onClick={() => router.push("/login")}
          >
            Login / Sign Up
          </button>
        )}
      </div>

      {/* Login success message */}
      {showLoginSuccess && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#4ade80",
            color: "#065f46",
            padding: "12px 32px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "18px",
            zIndex: 2000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
          }}
        >
          Login successful!
        </div>
      )}

      {/* Logout success message */}
      {showLogoutSuccess && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fca5a5",
            color: "#991b1b",
            padding: "12px 32px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "18px",
            zIndex: 2000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
          }}
        >
          Logout successful!
        </div>
      )}

      <Hero
        address="225 S 1st St Brooklyn, NY 11211"
        phone="(929) 123-4567"
        email="constrctr@restate.com"
      />

      {/* Payment entry buttons */}
      <div className="flex justify-center gap-8 my-8">
        <Link href="/subscribe">
          <button className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600">
            Subscribe Membership
          </button>
        </Link>
        <Link href="/listing">
          <button className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600">
            Pay to List Property
          </button>
        </Link>
      </div>

      <About
        cardTitle1="15 years"
        cardSubText1="in business"
        cardTitle2="$1 billion"
        cardSubText2="property brokered"
        cardTitle3="10,000"
        cardSubText3="transactions"
      />
      <Services />
      <Deals />
      <Review />
      <Insta />
      <Form />
      <Footer />
      {showButton && (
        <div className="fixed bottom-24 right-10 z-50">
          <button
            onClick={handleScrollToTop}
            className="bg-slate-100 rounded shadow-xl overflow-visible"
          >
            <Image src={scrollIcon} alt="scroll button" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;