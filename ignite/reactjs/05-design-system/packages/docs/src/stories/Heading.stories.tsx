import type { StoryObj, Meta } from "@storybook/react";

import { Heading, HeadingProps } from "@devleandrodias/react";

const headingConfig: Meta<HeadingProps> = {
	title: "Typography/Heading",
	component: Heading,
	args: {
		children: "Custom title",
	},
};

export default headingConfig;

export const Primary: StoryObj<HeadingProps> = {};

export const CustomTag: StoryObj<HeadingProps> = {
	args: {
		children: "H1 Heading",
		as: "h1",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Por padrao o heading sempre sera um `h2`, mas podemos alterar isso com a prorpriedade `as`",
			},
		},
	},
};
