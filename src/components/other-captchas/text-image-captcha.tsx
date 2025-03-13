import { useState, useEffect, useRef, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../submit-button";
import { RefreshCw } from "lucide-react";
import { drawCaptcha, generateCaptchaText } from "@/utils/captcha-generator";
import { useCooldown } from "@/hooks/useCooldown";

interface TextImageCaptchaProps {
  onVerify?: (success: boolean) => void;
}

const TextImageCaptcha: React.FC<TextImageCaptchaProps> = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { isInCooldown, remainingSeconds, startCooldown } = useCooldown(10);

  const refreshCaptcha = () => {
    if (isInCooldown) return;
    
    const newText = generateCaptchaText();
    setCaptchaText(newText);
    setUserInput("");
    setIsCorrect(null);
    setMessage("");
    startCooldown();
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

          <div className="border p-4 rounded-md bg-gray-50 relative">
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
              <button
                type="button"
                onClick={refreshCaptcha}
                disabled={isInCooldown}
                className="absolute right-4 top-4 p-2 border rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                title={isInCooldown ? `Wait ${remainingSeconds}s` : "New Captcha"}
              >
                <RefreshCw className={`h-5 w-5 ${isInCooldown ? 'animate-spin opacity-50' : ''}`} />
                {isInCooldown && <span className="ml-1 text-xs">{remainingSeconds}s</span>}
              </button>
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TextImageCaptcha;
