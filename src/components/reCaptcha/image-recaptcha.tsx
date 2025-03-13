import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../submit-button";
import FormAlert from "../form-alert";

interface ImageReCaptchaProps {
  recaptchaRef: React.RefObject<ReCAPTCHA>;
  ref?: React.RefObject<HTMLFormElement>;
  siteKey: string;
  formState: {
    success: boolean;
    message: string;
    submitted: boolean;
  };
  handleSubmit: (recaptchaValue: string | null, data: FormData) => void;
}

const ImageReCaptcha: React.FC<ImageReCaptchaProps> = ({
  recaptchaRef,
  siteKey,
  ref,
  formState,
  handleSubmit,
}) => {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaValue(token);
  };

  return (
    <Card className="py-5">
      <CardHeader>
        <CardTitle>Image reCaptcha</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={ref}
          action={(data) => handleSubmit(recaptchaValue, data)}
          className="space-y-4 min-w-[304px]"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <FormAlert formState={formState} />

          <div className="flex justify-center my-4 w-full">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={siteKey}
              onChange={handleRecaptchaChange}
            />
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
};

export default ImageReCaptcha;
