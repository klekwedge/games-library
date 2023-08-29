import { Flex, Loader } from '@mantine/core';

function Spinner(): JSX.Element {
  return (
    <Flex m='0 auto' w='100%' align='center' p='50px 0px' data-testid='spinner-flex'>
      <Loader size="xl" m='0 auto' data-testid='spinner-loader'/>
    </Flex>
  );
}

export default Spinner;
