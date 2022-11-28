import type { StoryObj, Meta } from "@storybook/react";

import { Box, Text, MultiStep, MultiStepProps } from "@devleandrodias/react";

const textConfig: Meta<MultiStepProps> = {
	title: "Form/Multi Step",
	component: MultiStep,
	args: {
		size: 4,
		currentStep: 1,
	},
	decorators: [
		(story) => {
			return (
				<Box
					as="label"
					css={{ display: "flex", flexDirection: "column", gap: "$2" }}
				>
					{story()}
				</Box>
			);
		},
	],
};

export default textConfig;

export const Primary: StoryObj<MultiStepProps> = {
	args: {},
};

export const Full: StoryObj<MultiStepProps> = {
	args: {
		currentStep: 4,
	},
};
