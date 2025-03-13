"use client";

import LogicalCaptcha from "@/components/other-captchas/logical-captcha";

export default function LogicalCaptchaPage() {
  const handleVerify = (success: boolean) => {
    console.log("Captcha verification:", success ? "passed" : "failed");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 py-3">Logical CAPTCHA Demo</h1>

      <div className="w-full max-w-xl">
        <LogicalCaptcha onVerify={handleVerify} />
      </div>
    </div>
  );
}
