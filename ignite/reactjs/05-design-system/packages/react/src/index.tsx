import { styled } from "./styles";

import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<typeof Button>;

export const Button = styled("button", {
	fontFamily: "$default",
	backgroundColor: "$ignite300",
	borderRadius: "$sm",
	border: 0,
	fontWeight: "$bold",
	color: "$white",
	cursor: "pointer",

	variants: {
		size: {
			small: {
				fontSize: 14,
				padding: "$2 $4",
			},
			big: {
				fontSize: 16,
				padding: "$3 $6",
			},
		},
	},

	defaultVariants: { size: "big" },
});
