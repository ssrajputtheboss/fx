import { Flex, IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';

export function SearchBar({ dfV, onSearch }) {
  const [text, setText] = useState(dfV);
  return (
    <Flex
      maxW='80%'
      my={10}
      mx={5}
      alignItems='center'
      alignSelf='center'
      justifyContent='space-between'>
      <Input
        value={text}
        onInput={(e) => {
          setText(e.target.value);
        }}
      />
      <IconButton
        ml={2}
        icon={<MdSearch />}
        onClick={(e) => {
          //search text
        }}></IconButton>
    </Flex>
  );
}
