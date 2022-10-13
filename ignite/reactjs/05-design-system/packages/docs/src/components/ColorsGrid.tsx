import { colors } from "@devleandrodias/tokens";

import { getContrast } from "polished";

export function ColorsGrid() {
	return Object.entries(colors).map(([key, color]) => {
		return (
			<div key={key} style={{ backgroundColor: color, padding: "2rem" }}>
				<div
					style={{
						display: "flex",
						color: getContrast(color, "#fff") < 3.5 ? "#000" : "#fff",
						fontFamily: "monospace",
						justifyContent: "space-between",
					}}
				>
					<strong>${key}</strong>
					<span>{color}</span>
				</div>
			</div>
		);
	});
}
