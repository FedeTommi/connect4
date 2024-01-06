const addViewBox = {
	name: "addViewBox",
	type: "full",
	description: "Replace width and height with viewBox",
	params: {},
	fn: () => {
		// console.log(data)
		// const svg = data.content[0]

		// if (
		// 	svg.isElem("svg") &&
		// 	"width" in svg.attrs &&
		// 	"height" in svg.attrs &&
		// 	!("viewBox" in svg.attrs)
		// ) {
		// 	svg.addAttr({
		// 		name: "viewBox",
		// 		value: `0 0 ${svg.attr("width").value} ${svg.attr("height").value}`,
		// 		prefix: "",
		// 		local: "class",
		// 	})

		// 	svg.removeAttr("width")
		// 	svg.removeAttr("height")
		// }
		// return data
		return {
			element: {
				enter: (node) => {
					const attrs = node.attributes
					if (
						node.name == "svg" &&
						"width" in attrs &&
						"height" in attrs &&
						!("viewBox" in attrs)
					) {
						node.attributes.addViewBox = `0 0 ${attrs.width} ${attrs.height}`
						node.attributes.width = undefined
						node.attributes.height = undefined
					}
				},
			},
		}
	},
}

module.exports = {
	plugins: [
		{
			name: "preset-default",
			params: {
				overrides: {
					removeViewBox: false,
				},
			},
		},
		addViewBox,
	],
}
