"use server";

import { z } from "zod";

import { FormResponse } from "./types";
import { verifyRecaptchaToken } from "./verify-token";

// Schema for validating the form data
const demoFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification is required"),
});

export async function submitDemoImageForm(
  formData: FormData
): Promise<FormResponse> {
  try {
    // Extract form data
    const email = formData.get("email") as string;
    const recaptchaToken = formData.get("recaptchaToken") as string;

    // Validate form data
    const validationResult = demoFormSchema.safeParse({
      email,
      recaptchaToken,
    });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors
        .map((err) => err.message)
        .join(", ");
      return {
        success: false,
        message: errorMessage,
      };
    }

    // Verify reCAPTCHA token
    const recaptchaResponse = await verifyRecaptchaToken(recaptchaToken);

    if (!recaptchaResponse.success) {
      return recaptchaResponse;
    }

    // Process the form data (e.g., save to database, send email, etc.)
    // This is where you would add your business logic
    console.log("Form submitted:", { email });

    // For demonstration purposes, we'll just return a success message
    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Error processing form submission:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
