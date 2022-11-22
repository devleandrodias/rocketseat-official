import type { StoryObj, Meta } from "@storybook/react";

import { Box, Text, TextArea, TextAreaProps } from "@devleandrodias/react";

const textConfig: Meta<TextAreaProps> = {
	title: "Form/Text Area",
	component: TextArea,
	args: {},
	decorators: [
		(story) => {
			return (
				<Box
					as="label"
					css={{ display: "flex", flexDirection: "column", gap: "$2" }}
				>
					<Text size="sm">Observations</Text>
					{story()}
				</Box>
			);
		},
	],
};

export default textConfig;

export const Primary: StoryObj<TextAreaProps> = {
	args: { placeholder: "Add any observations..." },
};

export const Disabled: StoryObj<TextAreaProps> = {
	args: { disabled: true },
};
