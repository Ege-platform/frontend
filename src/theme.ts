import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
        categoryCard1: Palette["primary"];
        categoryCard2: Palette["primary"];
        categoryCard3: Palette["primary"];
        categoryCard4: Palette["primary"];
    }
    interface PaletteOptions {
        categoryCard1: PaletteOptions["primary"];
        categoryCard2: PaletteOptions["primary"];
        categoryCard3: PaletteOptions["primary"];
        categoryCard4: PaletteOptions["primary"];
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: "#605DE3",
        },
        secondary: {
            main: "#605DE380",
        },
        categoryCard1: {
            main: "#605DE3",
        },
        categoryCard2: {
            main: "#7CB518",
        },
        categoryCard3: {
            main: "#F96108",
        },
        categoryCard4: {
            main: "#FAB02D",
        },
    },
});
