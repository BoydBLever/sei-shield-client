import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { Search2Icon, CloseIcon } from '@chakra-ui/icons';

import styled from 'styled-components';

const CustomBox = styled(Box)`
  width: 400px;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
`;

const StyledInput = styled(Input)`
  border-radius: 10px;
  height: 12px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  border-radius: 0 10px 10px 0;
  height: 12px;
  width: 16px;
`;

const ClearButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchClear = () => {
    setSearchText('');
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchText);
  };

  return (
    <CustomBox>
      <form onSubmit={handleSearchSubmit}>
        <InputGroup size='lg'>
          <StyledInput
            type='text'
            onChange={handleSearchChange}
            placeholder='Search Contract Address...'
          />
          {searchText && (
            <ClearButton onClick={handleSearchClear}>
              <CloseIcon color='blue.600' />
            </ClearButton>
          )}
          <InputRightAddon p={0} border='none'>
            <StyledButton size='lg'>
              <Search2Icon color='teal.600' />
            </StyledButton>
          </InputRightAddon>
        </InputGroup>
      </form>
    </CustomBox>
  );
}

export default SearchBar;
