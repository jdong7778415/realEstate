import React, { useState, useEffect } from "react";
import { properties } from "../data/properties";

const PAGE_SIZE = 6;

export default function PropertyList({ onSelect }) {
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 只在客户端渲染，避免 hydration 错误

  const totalPages = Math.ceil(properties.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentPageProperties = properties.slice(start, end);

  return (
    <div style={{ margin: "60px auto 32px auto", maxWidth: 600 }}>
      <h3>Select a property to join its chat:</h3>
      <ul>
        {currentPageProperties.map((p) => (
          <li key={p.id} style={{ margin: "12px 0" }}>
            <button
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "1px solid #2563eb",
                background: "#fff",
                color: "#2563eb",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => onSelect(p)}
            >
              {p.title}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ marginRight: 8 }}
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{ marginLeft: 8 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}