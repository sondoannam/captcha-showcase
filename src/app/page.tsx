"use client";

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import ImageReCaptcha from "@/components/reCaptcha/image-recaptcha";
import { submitDemoImageForm } from "@/actions";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

export default function Home() {
  const imageReCaptchaRef = useRef<ReCAPTCHA>(null!);

  const formState = useRef<{
    success: boolean;
    message: string;
    submitted: boolean;
  }>({
    success: false,
    message: "",
    submitted: false,
  });

  const handleSubmit = async (
    reCaptchaValue: string | null,
    formData: FormData
  ) => {
    if (!reCaptchaValue) {
      formState.current = {
        success: false,
        message: "Please complete the reCAPTCHA challenge.",
        submitted: true,
      };
      return;
    }

    // Add the reCAPTCHA token to the form data
    formData.append("recaptchaToken", reCaptchaValue);

    try {
      // Submit the form using the server action
      const result = await submitDemoImageForm(formData);

      formState.current = {
        success: result.success,
        message: result.message,
        submitted: true,
      };

      // Reset the form and reCAPTCHA if submission was successful
      if (result.success) {
        formData.delete("email");
        formData.delete("recaptchaToken");
        imageReCaptchaRef.current.reset();
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      formState.current = {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        submitted: true,
      };
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 py-3">
        Google reCaptcha Demo
      </h1>

      <div className="w-full flex flex-wrap gap-4">
        <ImageReCaptcha
          siteKey={siteKey}
          recaptchaRef={imageReCaptchaRef}
          formState={formState.current}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
