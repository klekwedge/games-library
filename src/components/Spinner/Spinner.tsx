import { Flex, Loader } from '@mantine/core';

function Spinner(): JSX.Element {
  return (
    <Flex m='0 auto' w='100%' align='center' p='50px 0px'>
      <Loader size="xl" m='0 auto' />
    </Flex>
  );
}

export default Spinner;
