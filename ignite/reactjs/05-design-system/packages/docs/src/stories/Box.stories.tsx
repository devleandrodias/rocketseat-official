import type { StoryObj, Meta } from "@storybook/react";

import { Box, BoxProps, Text } from "@devleandrodias/react";

const boxConfig: Meta<BoxProps> = {
	title: "Surfaces/Box",
	component: Box,
	args: {
		children: (
			<>
				<Text>Testando elemento BOX</Text>
			</>
		),
	},
};

export default boxConfig;

export const Primary: StoryObj<BoxProps> = {};
