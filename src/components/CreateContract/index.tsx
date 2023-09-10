import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Radio,
  RadioGroup,
  Stack,
  Input,
  Button,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

type Inputs = {
  itemPrice: number;
  walletAddress: string;
  radioValue: number;
};

const CreateContract = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [value, setValue] = React.useState("1");

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl >
          <FormLabel>I am the...</FormLabel>
          <Box>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row">
                <Radio value="1">Buyer</Radio>
                <Radio value="2">Seller</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <FormLabel>Item Price</FormLabel>
          <Input
            {...register("itemPrice", { required: true })}
            type="text"
            placeholder="Enter item price"
          />
          {errors.itemPrice && <span>This field is required</span>}
          <FormLabel>Other Party Wallet Address</FormLabel>
          <Input
            {...register("walletAddress", { required: true })}
            type="text"
            placeholder="Enter wallet address"
          />
          {errors.walletAddress && <span>This field is required</span>}
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          Create Contract
        </Button>
      </form>
    </Box>
  );
};

export default CreateContract;
