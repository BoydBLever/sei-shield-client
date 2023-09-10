import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SeiWalletProvider } from "@sei-js/react";
import SeiConnectWallet from "../SeiConnectWallet";
import {
  Box,
  Radio,
  RadioGroup,
  Stack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  NumberInput,
  Button,
  FormLabel,
  FormControl,
  useSteps,
  Flex,
  FormHelperText,
} from "@chakra-ui/react";
import FormStepper from "../FormStepper";

type Inputs = {
  depositAmount: number;
  radioValue: string;
};

const AgreementForm = () => {
  const steps = [
    { title: "Connect" },
    { title: "I am...", description: "Buyer / Seller" },
    { title: "Make Deposit", description: "Deposit Amount" },
    { title: "Review", description: "Transaction" },
    { title: "Confirm" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [selectedRadioValue, setSelectedRadioValue] = useState<string>("1");
  const [hasSelection, setHasSelection] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Inputs | null>(null);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (activeStep === steps.length - 1) {
      const finalFormData = {
        ...data,
        radioValue: selectedRadioValue,
      };
      setFormData(finalFormData);
    }
  };
  const setValue = (newValue: string) => {
    setSelectedRadioValue(newValue);
    setHasSelection(true);
  };

  return (
    <Flex direction="column" align="center">
      <FormLabel>Seller Page</FormLabel>
      <Box>
        <FormStepper activeStep={activeStep} steps={steps} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box height="140" marginTop="14">
            <FormControl>
              {activeStep === 0 && (
                <Flex justifyContent="center" alignContent="center">
                  <SeiWalletProvider
                    chainConfiguration={{
                      chainId: "atlantic-2",
                      restUrl: "https://rest.atlantic-2.seinetwork.io",
                      rpcUrl: "https://rpc.atlantic-2.seinetwork.io",
                    }}
                    wallets={["compass", "fin"]}
                  >
                    <SeiConnectWallet />
                  </SeiWalletProvider>
                </Flex>
              )}
              {activeStep === 1 && (
                <RadioGroup
                  onChange={setValue}
                  value={selectedRadioValue}
                  justifyContent="center"
                >
                  <FormLabel style={{ textAlign: "center" }}>
                    I am a...
                  </FormLabel>
                  <Stack direction="row" align="center" justify="center">
                    <Radio
                      value="Buyer"
                      onChange={() => setSelectedRadioValue("Buyer")}
                    >
                      Buyer
                    </Radio>
                    <Radio
                      value="Seller"
                      onChange={() => setSelectedRadioValue("Seller")}
                    >
                      Seller
                    </Radio>
                  </Stack>
                </RadioGroup>
              )}
              {activeStep === 2 && (
                <Flex align="center" direction="column">
                  <FormLabel fontWeight="bold" mb="2">
                    Deposit Amount
                  </FormLabel>
                  <FormHelperText>
                    Make a deposit equal to exactly 1x the item price.
                  </FormHelperText>
                  <Flex>
                    <NumberInput defaultValue={0} min={0}>
                      <NumberInputField {...register("depositAmount")} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Button type="button" colorScheme="blue" marginInline="1">
                      Deposit
                    </Button>
                  </Flex>
                </Flex>
              )}
              {activeStep === 3 && (
                <RadioGroup
                  onChange={setValue}
                  value={selectedRadioValue}
                  justifyContent="center"
                >
                  <FormLabel style={{ textAlign: "center" }}>
                    Confirm Transfer
                  </FormLabel>
                  <Stack direction="row" align="center" justify="center">
                    <Radio
                      value="given"
                      onChange={() => setSelectedRadioValue("given")}
                    >
                      I gave the correct item
                    </Radio>
                  </Stack>
                </RadioGroup>
              )}
              {activeStep === 4 && (
                <Flex align="center" direction="column">
                  <FormLabel fontWeight="bold" mb="2">
                    Review
                  </FormLabel>
                  {formData && (
                    <div>
                      <p>Deposit Amount: {formData.depositAmount}</p>
                      <p>Selected Choice: {formData.radioValue}</p>
                    </div>
                  )}
                </Flex>
              )}
            </FormControl>
          </Box>
          <Flex justifyContent="center" gap="3">
            <Button mt={4} colorScheme="teal" type="button" onClick={prevStep}>
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button mt={4} colorScheme="teal" type="submit">
                Settle
              </Button>
            ) : (
              <Button
                mt={4}
                colorScheme="teal"
                type="button"
                onClick={nextStep}
                isDisabled={activeStep === 1 && !hasSelection}
              >
                Next
              </Button>
            )}
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default AgreementForm;
