"use client";

import { useEffect, useState } from "react";

function copyWithFallback(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);

  try {
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, value.length);
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

export function CopyWechatRow({ value }: { value: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copyWechat() {
    let copied = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) copied = copyWithFallback(value);
    setStatus(copied ? "copied" : "failed");
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
