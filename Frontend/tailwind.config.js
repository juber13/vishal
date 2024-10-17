import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
module.exports = {
content: [
  "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path to where your files are located
  "./public/index.html",
],
theme: {
  extend: {},
},
plugins: [daisyui],

daisyui: {
  themes: [
    "light",
    {
      black: {
        ...daisyUIThemes["black"],
        primary: "rgb(29, 155, 240)",
        secondary: "rgb(24, 24, 24)",
      },
    },
  ],
},
}