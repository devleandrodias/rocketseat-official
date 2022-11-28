import type { StoryObj, Meta } from "@storybook/react";

import { Button, ButtonProps } from "@devleandrodias/react";
import { ArrowRight } from "phosphor-react";

const buttonConfig: Meta<ButtonProps> = {
	title: "Form/Button",
	component: Button,
	args: {
		children: "Send",
		variant: "primary",
		size: "md",
		disabled: false,
	},
	argTypes: {
		variant: {
			options: ["primary", "secondary", "tertiary"],
			control: {
				type: "inline-radio",
			},
		},
		size: {
			options: ["sd", "md"],
			control: {
				type: "inline-radio",
			},
		},
		disabled: {
			type: "boolean",
		},
		onClick: {
			action: "click",
		},
	},
};

export default buttonConfig;

export const Primary: StoryObj<ButtonProps> = {};

export const Secondary: StoryObj<ButtonProps> = {
	args: { variant: "secondary", children: "Back" },
};

export const Tertiary: StoryObj<ButtonProps> = {
	args: { variant: "tertiary", children: "Cancel" },
};

export const Small: StoryObj<ButtonProps> = {
	args: { size: "sm" },
};

export const WithIcon: StoryObj<ButtonProps> = {
	args: {
		children: (
			<>
				Next
				<ArrowRight weight="bold" />
			</>
		),
	},
};
export const Disabled: StoryObj<ButtonProps> = {
	args: { disabled: true },
};
