import React, { useState } from "react";
import { transferLand } from "../utils/landContract";

export default function LandTradePage() {
  const [buyer, setBuyer] = useState("");
  const [landID, setLandID] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!buyer || !landID) {
      alert("请填写买家地址和土地ID");
      return;
    }
    try {
      await transferLand(buyer, Number(landID));
    } catch (err) {
      alert("转让失败: " + (err?.message || err));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 24 }}>土地区块链转让</h2>
      <form onSubmit={handleTransfer}>
        <div style={{ marginBottom: 16 }}>
          <label>买家地址：</label>
          <input
            type="text"
            value={buyer}
            onChange={e => setBuyer(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            placeholder="0x..."
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>土地ID：</label>
          <input
            type="number"
            value={landID}
            onChange={e => setLandID(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            placeholder="如 1"
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 24px",
            borderRadius: "20px",
            fontWeight: 600,
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            width: "100%"
          }}
        >
          区块链转让
        </button>
      </form>
    </div>
  );
}