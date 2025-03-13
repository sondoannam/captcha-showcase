import { useState, useEffect, useCallback } from 'react';

interface UseCooldownResult {
  isInCooldown: boolean;
  remainingSeconds: number;
  startCooldown: () => void;
}

export function useCooldown(cooldownSeconds: number): UseCooldownResult {
  const [isInCooldown, setIsInCooldown] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  
  const startCooldown = useCallback(() => {
    setIsInCooldown(true);
    setRemainingSeconds(cooldownSeconds);
  }, [cooldownSeconds]);

  useEffect(() => {
    if (!isInCooldown) return;
    
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsInCooldown(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isInCooldown]);

  return { isInCooldown, remainingSeconds, startCooldown };
}
