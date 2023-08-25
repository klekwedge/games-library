import { Flex, Title, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Flex justify="space-between" align="center" maw="1400px" m="0 auto" p="20px 0px">
      <Title order={2}>
        <Link to="/" style={{ color: 'inherit' }}>
          Main Page
        </Link>
      </Title>
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
