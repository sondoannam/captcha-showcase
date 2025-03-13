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

  // Add lines for confusion
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    },0.5)`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw text
  ctx.font = "bold 30px sans-serif";
  ctx.fillStyle = "#333";
  ctx.textBaseline = "middle";

  // Draw each character with slight variations
  const textWidth = ctx.measureText(text).width;
  const startX = (canvas.width - textWidth) / 2;

  for (let i = 0; i < text.length; i++) {
    const charWidth = ctx.measureText(text[i]).width;
    const x = startX + i * charWidth + i * 3; // spacing between chars
    const y = canvas.height / 2 + (Math.random() * 10 - 5);
    const rotation = Math.random() * 0.4 - 0.2; // slight rotation

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }
};
