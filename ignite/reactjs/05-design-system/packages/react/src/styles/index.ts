import {
	fonts,
	radii,
	space,
	colors,
	fontSizes,
	fontWeights,
	lineHeights,
} from "@devleandrodias/tokens";

import { createStitches, defaultThemeMap } from "@stitches/react";

export const {
	css,
	theme,
	styled,
	config,
	globalCss,
	keyframes,
	getCssText,
	createTheme,
} = createStitches({
	themeMap: {
		...defaultThemeMap,
		width: "space",
		height: "space",
	},
	theme: {
		fonts,
		radii,
		space,
		colors,
		fontSizes,
		fontWeights,
		lineHeights,
	},
});
