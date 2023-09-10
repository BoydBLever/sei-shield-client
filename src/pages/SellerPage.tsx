import { Box, Flex, Image } from "@chakra-ui/react";
import styled from "styled-components";
import SeiShieldLogo from "../components/images/SeiShieldLogo.png";
import AgreementForm from "../components/AgreementForm";

const CustomBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80vh;
`;

const SellerPage = () => {
  return (
    <CustomBox>
      <Image boxSize="200px" src={SeiShieldLogo} alt="Sei Logo" />
      <Box>
        <AgreementForm/>
      </Box>
    </CustomBox>
  );
};

export default SellerPage;
