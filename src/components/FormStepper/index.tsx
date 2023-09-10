import React from "react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepStatus,
  StepTitle,
  StepSeparator,
  Box,
  Stepper,
} from "@chakra-ui/react";

interface StepInfo {
  title: string;
  description?: string;
}

interface FormStepperProps {
  activeStep: number;
  steps: StepInfo[];
}

const FormStepper: React.FC<FormStepperProps> = ({ activeStep, steps }) => {
  return (
    <Stepper index={activeStep} width="900px">
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            {step.description && (
              <StepDescription>{step.description}</StepDescription>
            )}
          </Box>

          <StepSeparator
            style={{
              width: "40px", 
            }}
          />
        </Step>
      ))}
    </Stepper>
  );
};

export default FormStepper;
