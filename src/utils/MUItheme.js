import { createTheme } from "@mui/material/styles";

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
            main: "#2e282a",
            contrastText: "#fff",
          },
          accent: {
            main: "#cd5334",
        },
          accent2: {
            main: "#edb88b",
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

// $team-green: rgb(111, 164, 111);
// $team-red: rgb(220, 140, 140);
// $base: #2e282a;
// $accent: #cd5334;
// $accent2: #edb88b;