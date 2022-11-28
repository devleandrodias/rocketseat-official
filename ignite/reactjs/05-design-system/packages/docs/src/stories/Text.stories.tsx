import type { StoryObj, Meta } from "@storybook/react";

import { Text, TextProps } from "@devleandrodias/react";

const textConfig: Meta<TextProps> = {
	title: "Typography/Text",
	component: Text,
	args: {
		children:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum atque labore, quaerat vitae voluptas tenetur illum nostrum est provident inventore in ducimus quibusdam vero debitis impedit architecto, optio eveniet aliquam!",
		size: "md",
	},
	argTypes: {
		size: {
			options: [
				"xxs",
				"xs",
				"sm",
				"md",
				"lg",
				"2xl",
				"4xl",
				"5xl",
				"6xl",
				"7xl",
				"8xl",
				"9xl",
			],
			control: {
				type: "inline-radio",
			},
		},
	},
};

export default textConfig;

export const Primary: StoryObj<TextProps> = {};

export const CustomTag: StoryObj<TextProps> = {
	args: {
		children: "Strong text",
		as: "strong",
	},
};
