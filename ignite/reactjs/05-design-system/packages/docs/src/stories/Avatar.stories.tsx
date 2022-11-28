import type { StoryObj, Meta } from "@storybook/react";

import { Avatar, AvatarProps, Text } from "@devleandrodias/react";

const avatarConfig: Meta<AvatarProps> = {
	title: "Data display/Avatar",
	component: Avatar,
	args: {
		src: "https://github.com/devleandrodias.png",
		alt: "Leandro Dias",
	},
	argTypes: {
		src: {
			control: {
				type: "text",
			},
		},
	},
};

export default avatarConfig;

export const Primary: StoryObj<AvatarProps> = {};

export const WithFallback: StoryObj<AvatarProps> = {
	args: {
		src: undefined,
	},
};
