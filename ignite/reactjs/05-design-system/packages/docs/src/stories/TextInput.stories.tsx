import type { StoryObj, Meta } from "@storybook/react";

import { Box, Text, TextInput, TextInputProps } from "@devleandrodias/react";

const textConfig: Meta<TextInputProps> = {
	title: "Form/Text Input",
	component: TextInput,
	args: {},
	decorators: [
		(story) => {
			return (
				<Box
					as="label"
					css={{ display: "flex", flexDirection: "column", gap: "$2" }}
				>
					<Text size="sm">Email address</Text>
					{story()}
				</Box>
			);
		},
	],
};

export default textConfig;

export const Primary: StoryObj<TextInputProps> = {
	args: { placeholder: "Type your name" },
};

export const Disabled: StoryObj<TextInputProps> = {
	args: { disabled: true },
};

export const WithPrefix: StoryObj<TextInputProps> = {
	args: { prefix: "call.com/" },
};
