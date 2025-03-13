import { useState, useEffect, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../submit-button";
import { RefreshCw } from "lucide-react";
import { generateMathChallenge } from "@/utils/captcha-generator";
import { useCooldown } from "@/hooks/useCooldown";

interface LogicalCaptchaProps {
  onVerify?: (success: boolean) => void;
}

const LogicalCaptcha: React.FC<LogicalCaptchaProps> = ({ onVerify }) => {
  const [challenge, setChallenge] = useState({ question: '', answer: '' });
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const { isInCooldown, remainingSeconds, startCooldown } = useCooldown(10);

  useEffect(() => {
    // Generate a new challenge when the component mounts
    refreshChallenge();
  }, []);

  const refreshChallenge = () => {
    if (isInCooldown) return;
    
    const newChallenge = generateMathChallenge();
    setChallenge(newChallenge);
    setUserAnswer('');
    setIsCorrect(null);
    setMessage('');
    startCooldown();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (userAnswer === challenge.answer) {
      setIsCorrect(true);
      setMessage('Correct! You passed the CAPTCHA.');
      onVerify?.(true);
    } else {
      setIsCorrect(false);
      setMessage('Incorrect answer. Please try again.');
      onVerify?.(false);
      // Generate a new challenge after incorrect attempt
      setTimeout(refreshChallenge, 1500);
    }
  };

  return (
    <Card className="py-5">
      <CardHeader>
        <CardTitle>Logical CAPTCHA</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="border p-4 rounded-md bg-gray-50 relative">
            <p className="text-lg font-medium mb-2">Solve this math problem to prove you&apos;re human:</p>

            <p className="text-xl font-bold text-center py-4 select-none">{challenge.question}</p>
            
            <button
              type="button"
              onClick={refreshChallenge}
              disabled={isInCooldown}
              className="absolute right-4 top-4 p-2 border rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              title={isInCooldown ? `Wait ${remainingSeconds}s` : "New Challenge"}
            >
              <RefreshCw className={`h-5 w-5 ${isInCooldown ? 'animate-spin opacity-50' : ''}`} />
              {isInCooldown && <span className="ml-1 text-xs">{remainingSeconds}s</span>}
            </button>
            
            <div className="space-y-2">
              <Label htmlFor="captcha-answer">Your Answer</Label>
              <Input
                id="captcha-answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="max-w-xs"
                required
              />
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded-md ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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

export default LogicalCaptcha;
