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
    'Permanent Marker',
];

export const fieldGroups = [
    {
        label: 'Title',
        fields: [
            {
                name: 'title',
                type: 'text',
                value: '',
                placeholder: "Hi, I'm Atanas Atanasov",
            },
            {
                min: '20',
                max: '48',
                name: 'title-size',
                type: 'number',
                value: '34',
            },
        ],
    },
    {
        label: 'Title Color',
        fields: [
            {
                type: 'color',
                name: 'title-color',
                value: '#ffffff',
            },
        ],
    },
    {
        label: 'Title Font',
        fields: [
            {
                type: 'select',
                name: 'title-font',
                value: 'Lexend Deca',
                options: fonts,
            },
        ],
    },
    {
        label: 'Subtitle',
        fields: [
            {
                name: 'subtitle',
                type: 'text',
                value: '',
                placeholder: 'Senior Web Developer ~ Procrastinator ~ Father',
            },
            {
                min: '12',
                max: '32',
                name: 'subtitle-size',
                type: 'number',
                value: '14',
            },
        ],
    },
    {
        label: 'Subtitle Color',
        fields: [
            {
                type: 'color',
                name: 'subtitle-color',
                value: '#ffffff',
            },
        ],
    },
    {
        label: 'Subtitle Font',
        fields: [
            {
                type: 'select',
                name: 'subtitle-font',
                value: 'Inconsolata',
                options: fonts,
            },
        ],
    },
    {
        label: 'Background Image',
        sublabel: 'from Unsplash',
        hint: 'Comma separated list of categories',
        fields: [
            {
                type: 'search',
                name: 'background-image',
                value: '',
            },
        ],
    },
    {
        label: 'Background Color',
        fields: [
            {
                type: 'color',
                name: 'background-color',
                value: '#000000',
            },
        ],
    },
];

export const sizes = {
    fb: {
        width: 820,
        height: 312,
    },
    tw: {
        width: 1500,
        height: 500,
    },
    in: {
        width: 1584,
        height: 396,
    },
    yt: {
        width: 2048,
        height: 1152,
    },
    rd: {
        width: 1920,
        height: 384,
    },
};
