import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PropertyList from "../components/PropertyList";
import ChatBox from "../components/ChatBox";

export default function ChatPage() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const u = JSON.parse(userStr);
      // 兼容不同字段
      setUser({
        userId: u.userId || u.uid,
        userName: u.userName || u.displayName || u.email || "Anonymous"
      });
    } else {
      router.replace(`/login?redirect=/chat`);
    }
  }, [router]);

  if (!user) return null;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", background: "#fafbfc", padding: 24, borderRadius: 12 }}>
      {!selectedProperty ? (
        <PropertyList onSelect={setSelectedProperty} />
      ) : (
        <ChatBox
          userId={user.userId}
          userName={user.userName}
          property={selectedProperty}
          onBack={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}