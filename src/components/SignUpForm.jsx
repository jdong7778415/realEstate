import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  signUp,
  login,
  loginWithGoogle,
  loginWithFacebook,
  loginWithApple,
} from "../utils/auth";

export default function SignUpForm({ forceShowModal = false, initialMode = "signup" }) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(forceShowModal);
  const [mode, setMode] = useState(initialMode); // "signup" or "login"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setShowModal(forceShowModal);
  }, [forceShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let user;
      if (mode === "signup") {
        user = await signUp(email, password, { name, email });
      } else {
        user = await login(email, password);
      }
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || name || "",
      }));
      // Show success and redirect to home
      alert("Login successful!");
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSocialLogin = async (providerFn) => {
    setError("");
    try {
      const user = await providerFn();
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      }));
      // Show success and redirect to home
      alert("Login successful!");
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!showModal) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "32px 28px",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          minWidth: 320,
          display: "flex",
          flexDirection: "column",
          gap: 16
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 8, color: "#333" }}>
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </h2>
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: 16
            }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: 16
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: 16
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            background: "#0070f3",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            type="button"
            onClick={() => handleSocialLogin(loginWithGoogle)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: "#fff",
              color: "#333",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin(loginWithFacebook)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #4267B2",
              background: "#4267B2",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Sign in with Facebook
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin(loginWithApple)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #000",
              background: "#000",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Sign in with Apple
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          {mode === "signup" ? (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#0070f3",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: 14
                }}
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#0070f3",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: 14
                }}
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
      </form>
    </div>
  );
}