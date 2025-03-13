import { useState, useEffect, useRef, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../submit-button";
import { drawCaptcha, generateCaptchaText } from "@/utils/captcha-generator";

interface TextImageCaptchaProps {
  onVerify?: (success: boolean) => void;
}

const TextImageCaptcha: React.FC<TextImageCaptchaProps> = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const refreshCaptcha = () => {
    const newText = generateCaptchaText();
    setCaptchaText(newText);
    setUserInput("");
    setIsCorrect(null);
    setMessage("");
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  useEffect(() => {
    if (captchaText) {
      drawCaptcha(captchaText, canvasRef);
    }
  }, [captchaText]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setIsCorrect(true);
      setMessage("Correct! You passed the CAPTCHA.");
      onVerify?.(true);
    } else {
      setIsCorrect(false);
      setMessage("Incorrect. Please try again.");
      onVerify?.(false);
      // Generate new captcha after incorrect attempt
      setTimeout(refreshCaptcha, 1500);
    }
  };

  return (
    <Card className="py-5">
      <CardHeader>
        <CardTitle>Text-Image CAPTCHA</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="border p-4 rounded-md bg-gray-50">
            <p className="text-base font-medium mb-2">
              Type the characters you see in the image:
            </p>
            <div className="flex justify-center mb-4">
              <canvas
                ref={canvasRef}
                className="border rounded-md bg-white"
                width={200}
                height={70}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="captcha-input">Characters</Label>
              <Input
                id="captcha-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter captcha text"
                className="max-w-xs"
                required
              />
            </div>
          </div>

          {message && (
            <div
              className={`p-3 rounded-md ${
                isCorrect
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex gap-3">
            <SubmitButton />
            <button
              type="button"
              onClick={refreshCaptcha}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              New Captcha
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TextImageCaptcha;
