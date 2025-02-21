import {extendTheme, ThemeConfig} from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    colors:{
        "primary": "#2e63a6",
        "secondary": "#234b7e"
    }
});
export default theme;
