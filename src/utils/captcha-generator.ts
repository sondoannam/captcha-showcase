// Simple utility to generate mock CAPTCHA challenges

// Generate a simple math challenge
export function generateMathChallenge(): { question: string; answer: string } {
  const operations = ["+", "-", "*"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let num1, num2, answer;

  switch (operation) {
    case "+":
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = (num1 + num2).toString();
      return { question: `${num1} + ${num2} = ?`, answer };

    case "-":
      num1 = Math.floor(Math.random() * 10) + 5; // Ensure num1 is larger
      num2 = Math.floor(Math.random() * num1);
      answer = (num1 - num2).toString();
      return { question: `${num1} - ${num2} = ?`, answer };

    case "*":
      num1 = Math.floor(Math.random() * 5) + 1; // Keep numbers small
      num2 = Math.floor(Math.random() * 5) + 1;
      answer = (num1 * num2).toString();
      return { question: `${num1} × ${num2} = ?`, answer };

    default:
      return { question: "1 + 1 = ?", answer: "2" };
  }
}

// Generate random captcha text
export const generateCaptchaText = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Draw captcha on canvas
export const drawCaptcha = (
  text: string,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  if (!canvasRef.current) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Canvas settings
  canvas.width = 200;
  canvas.height = 70;

  // Clear canvas
  ctx.fillStyle = "#f8f9fa";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add noise (dots)
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    },0.3)`;
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Add lines for confusion with increased thickness
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    },0.5)`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineWidth = 1 + Math.random(); // Thicker lines (1-2px)
    ctx.stroke();
  }

  // Draw text
  ctx.font = "bold 30px sans-serif";
  ctx.textBaseline = "middle";

  // Calculate total width needed for all characters with some spacing
  const avgCharWidth = ctx.measureText("W").width; // Use a wide character as reference
  const totalSpacingNeeded = avgCharWidth * text.length * 0.8; // Allow for some overlap
  
  // Calculate starting position to center the text
  const startX = (canvas.width - totalSpacingNeeded) / 2;
  
  // Individual character spacing (pixels between characters)
  const charSpacing = totalSpacingNeeded / text.length;
  
  // Draw each character with appropriate spacing
  for (let i = 0; i < text.length; i++) {
    // Use different colors for adjacent characters
    ctx.fillStyle = `rgb(${30 + Math.random() * 100}, ${30 + Math.random() * 100}, ${30 + Math.random() * 100})`;
    
    // Calculate position with jitter
    const x = startX + i * charSpacing + (Math.random() * 4 - 2);
    const y = canvas.height / 2 + (Math.random() * 10 - 5);
    
    // Random rotation - sometimes more tilted
    const rotation = (Math.random() * 0.5 - 0.25) * (Math.random() > 0.7 ? 1.5 : 1);
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }
};
