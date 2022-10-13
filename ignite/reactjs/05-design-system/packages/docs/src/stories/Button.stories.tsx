import type { StoryObj, Meta } from "@storybook/react";

import { Button, ButtonProps } from "@devleandrodias/react";

const buttonConfig: Meta<ButtonProps> = {
	title: "Form/Button",
	component: Button,
	args: { children: "Send" },
};

export default buttonConfig;

export const Primary: StoryObj<ButtonProps> = {};

export const Big: StoryObj<ButtonProps> = {
	args: {
		size: "big",
	},
};
