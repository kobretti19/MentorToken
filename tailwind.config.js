/** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//     fontFamily: {
//       manrope: ["Manrope", "normal"],
//     },
//   },
//   plugins: [],
// };
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      manrope: ["Manrope", "normal"],
    },
  },
  plugins: [],
});
