import { useState, useEffect, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../submit-button";
import { generateMathChallenge } from "@/utils/captcha-generator";

interface LogicalCaptchaProps {
  onVerify?: (success: boolean) => void;
}

const LogicalCaptcha: React.FC<LogicalCaptchaProps> = ({ onVerify }) => {
  const [challenge, setChallenge] = useState({ question: '', answer: '' });
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Generate a new challenge when the component mounts
    refreshChallenge();
  }, []);

  const refreshChallenge = () => {
    const newChallenge = generateMathChallenge();
    setChallenge(newChallenge);
    setUserAnswer('');
    setIsCorrect(null);
    setMessage('');
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

          <div className="border p-4 rounded-md bg-gray-50">
            <p className="text-lg font-medium mb-2">Solve this math problem to prove you&apos;re human:</p>
            <p className="text-xl font-bold text-center py-4">{challenge.question}</p>
            
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
            <button 
              type="button" 
              onClick={refreshChallenge}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              New Challenge
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LogicalCaptcha;
