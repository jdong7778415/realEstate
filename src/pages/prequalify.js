import React, { useEffect } from "react";

export default function Prequalify() {
  useEffect(() => {
    // 配置 Homewise 对象
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      var homewise = {
        partner: {
          type: "r",
          code: "buyerfolio",
          segment: "main"
        },
        mortgageApp: {
          bg: "#fff7ed"
        }
      };
    `;
    document.head.appendChild(configScript);

    // 加载 Homewise widget 脚本
    const widgetScript = document.createElement("script");
    widgetScript.src = "https://widgets.thinkhomewise.com/lib/com-mortgage-app/1.0/embed.js";
    widgetScript.async = true;
    document.head.appendChild(widgetScript);

    // 清理脚本
    return () => {
      document.head.removeChild(configScript);
      document.head.removeChild(widgetScript);
    };
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12 }}>
      <h2 style={{ marginBottom: 24 }}>Get Pre-Qualified for a Mortgage</h2>
      <div className="homewise_mortgage_app"></div>
    </div>
  );
}
