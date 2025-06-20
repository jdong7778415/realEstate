import SignUpForm from "../components/SignUpForm";

export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <SignUpForm forceShowModal={true} initialMode="login"/>
    </div>
  );
}
