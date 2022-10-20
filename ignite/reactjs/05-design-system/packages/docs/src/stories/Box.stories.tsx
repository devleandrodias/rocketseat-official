import type { StoryObj, Meta } from "@storybook/react";

import { Box, BoxProps } from "@devleandrodias/react";

const boxConfig: Meta<BoxProps> = {
	title: "Surfaces/Box",
	component: Box,
	args: {
		children: (
			<>
				<span>Testando elemento BOX</span>
			</>
		),
	},
};

export default boxConfig;

export const Primary: StoryObj<BoxProps> = {};
