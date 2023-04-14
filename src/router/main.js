import {
  Flex,
  Text,
  Divider,
  IconButton,
  Wrap,
  WrapItem,
  Modal,
  ModalCloseButton,
  ModalBody,
  Input,
  Button
} from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { File } from '../components/File';
import { useEffect, useState } from 'react';
import { ENDPOINT, openFolder } from '../api';
import { MdArrowBack, MdUpload } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();
  const curPath = useLocation().pathname;
  const [modalOpen, setOpen] = useState(false);
  const [query, setQuery] = useSearchParams();
  const [files, setFiles] = useState([]);
  const [noOfPages, setNoOfPages] = useState(1);
  useEffect(() => {
    openFolder(curPath, query.get('page') || 1)
      .then(({ files, noOfPages }) => {
        setFiles(files);
        setNoOfPages(noOfPages);
      })
      .catch((e) => back());
    return () => {};
  }, [curPath, query]);

  const pages = [];
  for (let i = 1; i <= noOfPages; ++i) {
    pages.push(
      <Button
        mx={1}
        disabled={i == query.get('page')}
        key={'page' + i}
        variant={i == query.get('page') ? 'solid' : 'outline'}
        colorScheme='cyan'
        onClick={(e) => {
          query.set('page', i);
          setQuery(query);
        }}>
        {i}
      </Button>
    );
  }

  const back = () => {
    if (curPath === '/') return;
    const splits = curPath.split('/');
    if (splits.length > 1) {
      let newPath = splits.slice(0, splits.length - 1).join('/');
      newPath = newPath || '/';
      navigate(newPath + '?page=1');
    }
  };

  return (
    <Flex m={4} p={1} w='96%' h='100%' flexDir='column' alignItems='start'>
      <Divider />
      <Flex alignItems='center'>
        <IconButton mr={5} icon={<MdArrowBack />} onClick={back}></IconButton>
        <Text mb={5} color='blue.400'>
          {curPath}
        </Text>
      </Flex>
      <Wrap w='100%' h='100%' maxW='100vw'>
        {files.map((e, i) => (
          <WrapItem key={i} border='1px solid red' color='red'>
            <File
              path={curPath + (curPath === '/' ? '' : '/') + e}
              open={() => {
                navigate(curPath + (curPath === '/' ? '' : '/') + e + '?page=1');
              }}></File>
          </WrapItem>
        ))}
      </Wrap>
      <Wrap
        zIndex='1000'
        background='blue.100'
        position='fixed'
        overflow='hidden'
        bottom='5'
        my={5}
        mx={10}
        w='fit-content'
        maxW='50%'
        overflowY='scroll'
        borderRadius={10}
        padding={1}
        justifyContent='flex-start'
        alignItems='center'>
        {pages}
      </Wrap>
      <Modal size='sm' isCentered={true} isOpen={modalOpen} onClose={() => setOpen(false)}>
        <ModalBody
          m={2}
          p={5}
          borderRadius={10}
          bg='white'
          border='2px solid blue'
          zIndex='500'
          position='fixed'
          bottom='200px'>
          <Text>Upload New File</Text>
          <ModalCloseButton />
          <form
            id='uploadForm'
            action={`${ENDPOINT}/upload`}
            method='post'
            onSubmit={(e) => {
              setOpen(false);
            }}
            target='_blank'
            encType='multipart/form-data'>
            <Input name='newFile' my={5} type='file' />
            <Input name='filePath' mb={5} type='text' value={curPath} readOnly />
            <Input type='submit' value='Upload' bg='green' />
          </form>
        </ModalBody>
      </Modal>
      {!modalOpen && (
        <IconButton
          position='fixed'
          bottom='10'
          right='10'
          icon={<MdUpload />}
          onClick={() => setOpen(true)}></IconButton>
      )}
    </Flex>
  );
}
