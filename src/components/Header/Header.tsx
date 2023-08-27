import { Flex, Title, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IoGameController } from 'react-icons/io5';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Flex justify="space-between" align="center" m="0 auto" p="20px 0px">
      <Link to="/" style={{ color: 'inherit' }}>
        <IoGameController size="50px" title="Go to main page" />
      </Link>
      <ActionIcon
        variant="outline"
        color={colorScheme === 'dark' ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
        w="35px"
        h="35px"
      >
        {colorScheme === 'dark' ? <BsSunFill size="65%" /> : <BsMoonFill size="65%" />}
      </ActionIcon>
    </Flex>
  );
}

export default Header;
