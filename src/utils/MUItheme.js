import { createTheme } from "@mui/material/styles";
import styles from './_variables.scss'

export default function MUItheme() {
    const theme = createTheme({
        status: {
          danger: "#e53e3e",
        },
        palette: {
          primary: {
            main: "#2e282a",
            darker: "#333",
          },
          base: {
            main: styles.baseColor,
            contrastText: "#fff",
          },
          accent: {
            main: styles.accent,
        },
          accentLight: {
            main: styles.accentLight,
        },
          start: {
            main: "#6474aB",
            contrastText: "#fff",
          },
          light: {
            main: "#eee",
            darker: "#ddd",
            contrastText: "#777",
          },
        },
      });
  return theme
}