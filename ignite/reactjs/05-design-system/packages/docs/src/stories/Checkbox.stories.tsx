import type { StoryObj, Meta } from "@storybook/react";

import { Box, Text, Checkbox, CheckboxProps } from "@devleandrodias/react";

const textConfig: Meta<CheckboxProps> = {
	title: "Form/Checkbox",
	component: Checkbox,
	args: {},
	decorators: [
		(story) => {
			return (
				<Box
					as="label"
					css={{ display: "flex", flexDirection: "row", gap: "$2" }}
				>
					{story()}
					<Text size="sm">Accept terms of use</Text>
				</Box>
			);
		},
	],
};

export default textConfig;

export const Primary: StoryObj<CheckboxProps> = {
	args: { placeholder: "Type your name" },
};
