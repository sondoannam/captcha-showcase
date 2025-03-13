import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormAlertProps {
  formState: {
    success: boolean;
    message: string;
    submitted?: boolean;
  };
}

const FormAlert: React.FC<FormAlertProps> = ({ formState }) => {
  if (!formState.submitted) {
    return null;
  }

  return (
    <Alert variant={formState.success ? "default" : "destructive"}>
      {formState.success ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertTitle>{formState.success ? "Success" : "Error"}</AlertTitle>
      <AlertDescription>{formState.message}</AlertDescription>
    </Alert>
  );
};

export default FormAlert;
