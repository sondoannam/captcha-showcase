"use server";

import { FormResponse } from "./types";

export async function verifyRecaptchaToken(
  token: string
): Promise<FormResponse> {
  try {
    // Make sure the secret key is available
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("Missing RECAPTCHA_SECRET_KEY environment variable");
      return {
        success: false,
        message: "Server configuration error. Please contact support.",
      };
    }

    // Prepare the request to Google's reCAPTCHA verification API
    const recaptchaURL = "https://www.google.com/recaptcha/api/siteverify";
    const requestBody = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    });

    // Send the verification request to Google
    const response = await fetch(recaptchaURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody.toString(),
    });

    // Parse the response
    const data = await response.json();

    // Check if the verification was successful
    if (data.success) {
      // You can also check the score for v3 reCAPTCHA here if needed
      return {
        success: true,
        message: "reCAPTCHA verification successful",
      };
    } else {
      // Handle specific error codes from Google
      const errorCodes = data["error-codes"] || [];
      let errorMessage = "reCAPTCHA verification failed.";

      if (errorCodes.includes("missing-input-secret")) {
        errorMessage = "The secret parameter is missing.";
      } else if (errorCodes.includes("invalid-input-secret")) {
        errorMessage = "The secret parameter is invalid or malformed.";
      } else if (errorCodes.includes("missing-input-response")) {
        errorMessage = "The response parameter is missing.";
      } else if (errorCodes.includes("invalid-input-response")) {
        errorMessage = "The response parameter is invalid or malformed.";
      } else if (errorCodes.includes("bad-request")) {
        errorMessage = "The request is invalid or malformed.";
      } else if (errorCodes.includes("timeout-or-duplicate")) {
        errorMessage =
          "The response is no longer valid: either is too old or has been used previously.";
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return {
      success: false,
      message: "An error occurred during reCAPTCHA verification.",
    };
  }
}
