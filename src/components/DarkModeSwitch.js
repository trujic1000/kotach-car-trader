import {useColorMode, Switch} from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Switch
      position="fixed"
      top="1.25rem"
      right="1rem"
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};
