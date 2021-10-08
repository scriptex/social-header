// https://github.com/jakewtaylor/react-google-font-loader
// https://github.com/bubkoo/html-to-image

import 'react-app-polyfill/ie11';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import GoogleFontLoader from 'react-google-font-loader';

const fonts = [
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

const fieldGroups = [
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
                max: '50',
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
                value: '',
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
                min: '20',
                max: '50',
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
                value: '',
                options: fonts,
            },
        ],
    },
    {
        label: 'Background Image',
        fields: [
            {
                type: 'file',
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

const sizes = {
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

const App = () => {
    const [network, setNetwork] = React.useState('');
    const [customWidth, setCustomWidth] = React.useState(0);
    const [customHeight, setCustomHeight] = React.useState(0);
    const { register, handleSubmit, getValues } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    const [values, setValues] = React.useState(getValues());

    return (
        <>
            <GoogleFontLoader
                fonts={fonts.map((font) => ({ font, weights: [400] }))}
            />

            <h1>Social Header Studio</h1>

            <p>Build your own custom header image for any social network.</p>

            <label htmlFor="social-network">Select your social network</label>

            <select
                id="social-network"
                name="social-network"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
            >
                <option value="">Please choose</option>
                <option value="fb">Facebook</option>
                <option value="tw">Twitter</option>
                <option value="in">LinkedIn</option>
                <option value="yt">YouTube</option>
                <option value="rd">Reddit</option>
                <option value="custom">Custom</option>
            </select>

            {network === 'custom' && (
                <div>
                    <label htmlFor="custom-width">Width</label>

                    <input
                        id="custom-width"
                        type="number"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(Number(e.target.value))}
                    />

                    <label htmlFor="custom-height">Height</label>

                    <input
                        id="custom-height"
                        type="number"
                        value={customHeight}
                        onChange={(e) =>
                            setCustomHeight(Number(e.target.value))
                        }
                    />
                </div>
            )}

            <div
                className="preview"
                style={{
                    backgroundColor: values['background-color'] || '#000000',
                    backgroundImage: values['background-image'],
                }}
            >
                <h2
                    style={{
                        color: values['title-color'] || '#ffffff',
                        fontSize: Number(values['title-size']) || 34,
                        fontFamily: values['title-font'],
                    }}
                >
                    {values.title || "Hi, I'm Atanas Atanasov"}
                </h2>

                <p
                    style={{
                        color: values['subtitle-color'] || '#ffffff',
                        fontSize: Number(values['subtitle-size']) || 14,
                        fontFamily: values['subtitle-font'],
                    }}
                >
                    {values.subtitle ||
                        'Senior Web Developer ~ Procrastinator ~ Father'}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {fieldGroups.map((group, i) => (
                    <div key={i}>
                        <label>{group.label}</label>

                        {group.fields.map((field, j) =>
                            field.type === 'select' ? (
                                <select {...register(field.name)}>
                                    {field.options.map((option, k) => (
                                        <option value={option} key={k}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    min={field.min}
                                    max={field.max}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    {...register(field.name)}
                                    onChange={(e) => {
                                        setValues({
                                            ...values,
                                            [field.name]: e.target.value,
                                        });
                                    }}
                                />
                            ),
                        )}
                    </div>
                ))}
            </form>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
