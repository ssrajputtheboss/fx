import {
  Flex,
  Text,
  Image,
  Box,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton
} from '@chakra-ui/react';
import { MdFileOpen } from 'react-icons/md';
import { ENDPOINT } from '../../api';
const types = ['folder', 'image', 'video'];
export function File({ open, path }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const type = path.endsWith('.mp4')
    ? 'video'
    : path.length > 4 &&
      (['.jpg', '.png', '.gif'].includes(path.substring(path.length - 4)) || path.endsWith('.jpeg'))
    ? 'image'
    : 'folder';
  if (!types.includes(type)) {
    return <Text color='red.200'>Unsupported File ❌</Text>;
  }
  const paths = path.split('/');
  const title = paths[paths.length - 1];
  const ui =
    type === types[0] ? (
      <Flex
        flex={3}
        width='100%'
        h='100%'
        minH='100px'
        border='1px solid red'
        justifyContent='center'
        alignItems='center'
        onClick={open}>
        <MdFileOpen />
      </Flex>
    ) : type === types[2] ? (
      <Box onClick={onOpen}>
        <video autoPlay={false} muted controls={false}>
          <source src={`${ENDPOINT}/video${path}`} type='video/mp4' />
        </video>
      </Box>
    ) : (
      <Image onClick={onOpen} src={`${ENDPOINT}/image${path}`}></Image>
    );
  return (
    <Flex flexDir='column' color='black' w='250px' alignItems='center'>
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalBody zIndex='100' position='fixed' left='0' top='0'>
          <ModalCloseButton zIndex='200' background='red' />
          {type === types[1] ? (
            <Image h='100%' w='100%' onClick={onOpen} src={`${ENDPOINT}/image${path}`}></Image>
          ) : (
            <video style={{ height: '100%', width: '100%' }} autoPlay muted={false} controls>
              <source src={`${ENDPOINT}/video${path}`} type='video/mp4' />
            </video>
          )}
        </ModalBody>
      </Modal>
      {ui}
      <Text
        display='inline-block'
        textOverflow='ellipsis'
        overflow='hidden'
        whiteSpace='nowrap'
        textAlign='center'
        flex={1}
        size='sm'
        width='220px'
        fontWeight='bold'>
        {title}
      </Text>
    </Flex>
  );
}
