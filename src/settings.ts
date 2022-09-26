export interface Field {
	min?: string;
	max?: string;
	name: string;
	type: string;
	value: string;
	options?: string[];
	placeholder?: string;
}

export interface FieldGroup {
	hint?: string;
	label: string;
	fields: Field[];
	labelHint?: string;
}

export const fonts = [
	'Lexend Deca',
	'Allison',
	'Bebas Neue',
	'Inconsolata',
	'Ubuntu Mono',
	'Indie Flower',
	'Karantina',
	'Urbanist',
	'Righteous',
	'Grechen Fuemen',
	'Permanent Marker'
];

export const fieldGroups: FieldGroup[] = [
	{
		label: 'Title',
		labelHint: 'Font size',
		fields: [
			{
				name: 'title',
				type: 'text',
				value: '',
				placeholder: 'Your title'
			},
			{
				min: '20',
				max: '100',
				name: 'title-size',
				type: 'number',
				value: '34'
			}
		]
	},
	{
		label: 'Title Color',
		fields: [
			{
				type: 'color',
				name: 'title-color',
				value: '#ffffff'
			}
		]
	},
	{
		label: 'Title Font',
		fields: [
			{
				type: 'select',
				name: 'title-font',
				value: 'Lexend Deca',
				options: fonts
			}
		]
	},
	{
		label: 'Subtitle',
		labelHint: 'Font size',
		fields: [
			{
				name: 'subtitle',
				type: 'text',
				value: '',
				placeholder: 'Your subtitle'
			},
			{
				min: '12',
				max: '60',
				name: 'subtitle-size',
				type: 'number',
				value: '14'
			}
		]
	},
	{
		label: 'Subtitle Color',
		fields: [
			{
				type: 'color',
				name: 'subtitle-color',
				value: '#ffffff'
			}
		]
	},
	{
		label: 'Subtitle Font',
		fields: [
			{
				type: 'select',
				name: 'subtitle-font',
				value: 'Inconsolata',
				options: fonts
			}
		]
	},
	{
		label: 'Background Image',
		labelHint: 'from Unsplash',
		hint: 'Comma separated list of categories',
		fields: [
			{
				type: 'search',
				name: 'background-image',
				value: ''
			}
		]
	},
	{
		label: 'Background Color',
		fields: [
			{
				type: 'color',
				name: 'background-color',
				value: '#000000'
			}
		]
	},
	{
		label: 'Background Blur',
		fields: [
			{
				min: '0',
				max: '10',
				type: 'range',
				name: 'background-blur',
				value: '0'
			}
		]
	}
];

export const defaultValues: Record<string, string> = fieldGroups
	.flat()
	.reduce((result: Field[], group: FieldGroup) => [...result, ...group.fields], [])
	.reduce(
		(result: Record<string, string>, field: Field) => ({
			...result,
			[field.name]: field.value
		}),
		{}
	);

export const sizes: Record<string, Record<'width' | 'height', number>> = {
	fb: {
		width: 820,
		height: 312
	},
	tw: {
		width: 1500,
		height: 500
	},
	in: {
		width: 1584,
		height: 396
	},
	yt: {
		width: 2048,
		height: 1152
	},
	rd: {
		width: 1920,
		height: 384
	}
};
