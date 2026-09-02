"use client";

import { useEffect, useState } from "react";

function copyWithFallback(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  return copied;
}

export function CopyWechatRow({ value }: { value: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copyWechat() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else if (!copyWithFallback(value)) {
        throw new Error("Copy unavailable");
      }
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const action =
    status === "copied"
      ? "Copied / 已复制"
      : status === "failed"
        ? "Copy manually / 请手动复制"
        : "Copy ID / 复制微信号";

  return (
    <button className="info-row contact-button" type="button" onClick={copyWechat}>
      <span className="row-mark" aria-hidden="true">WX</span>
      <span className="row-copy">
        <span className="row-label">WeChat</span>
        <span className="row-value">{value}</span>
        <span className="row-hint" aria-live="polite">{action}</span>
      </span>
      <span className="row-arrow" aria-hidden="true">＋</span>
    </button>
  );
}
