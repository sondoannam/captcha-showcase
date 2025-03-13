"use client";

import TextImageCaptcha from "@/components/other-captchas/text-image-captcha";

export default function TextImageCaptchaPage() {
  const handleVerify = (success: boolean) => {
    console.log("Captcha verification:", success ? "passed" : "failed");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 py-3">Text-Image CAPTCHA Demo</h1>

      <div className="w-full max-w-xl">
        <TextImageCaptcha onVerify={handleVerify} />
      </div>
    </div>
  );
}
