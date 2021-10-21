// https://github.com/bubkoo/html-to-image

import 'react-app-polyfill/ie11';
import 'normalize.css';

import * as React from 'react';
import download from 'downloadjs';
import { saveAs } from 'file-saver';
import { useForm } from 'react-hook-form';

import { sizes, fieldGroups, downloadMethods } from './settings';

const onDownload = (
    type: string,
    node: HTMLElement | null,
    size: Record<'width' | 'height', number>,
) => {
    if (!node) {
        return;
    }

    console.log(size);

    const promise = downloadMethods[type](node, {
        ...size,
    });

    if (type === 'PNG') {
        promise.then((data: string) => download(data, 'social-header.png'));
    }

    if (type === 'JPEG') {
        promise.then((data: string) => download(data, 'social-header.jpg'));
    }

    if (type === 'SVG') {
        promise.then((data: string) => download(data, 'social-header.svg'));
    }

    if (type === 'Blob') {
        promise.then((data: Blob) => saveAs(data, 'social-header.png'));
    }
};

const defaultValues: Record<string, string> = fieldGroups
    .flat()
    .reduce((result, group) => [...result, ...group.fields], [])
    .reduce((result, field) => ({ ...result, [field.name]: field.value }), {});

const onFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (base64: string) => void,
) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => callback(reader.result?.toString() || '');
    reader.readAsDataURL(file as any);
};

export const Studio = () => {
    const [image, setImage] = React.useState('');
    const [network, setNetwork] = React.useState('');
    const [customWidth, setCustomWidth] = React.useState(1500);
    const [customHeight, setCustomHeight] = React.useState(500);
    const { watch, register, handleSubmit } = useForm({
        defaultValues,
    });

    const values = watch();

    const size = React.useMemo(
        () => sizes[network] || { width: customWidth, height: customHeight },
        [],
    );

    const onSubmit = () =>
        onDownload(
            values['download-type'],
            document.querySelector('.preview'),
            size,
        );

    return (
        <>
            <h1>Social Header Studio</h1>

            <h2>Build your own custom header image for any social network.</h2>

            <div className="form-group">
                <div className="form-row">
                    <label htmlFor="social-network">
                        Select your social network
                    </label>

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
                </div>
            </div>

            {network === 'custom' && (
                <div className="form-group">
                    <div className="form-row">
                        <label htmlFor="custom-width">Width</label>

                        <input
                            id="custom-width"
                            type="number"
                            value={customWidth}
                            onChange={(e) =>
                                setCustomWidth(Number(e.target.value))
                            }
                        />
                    </div>

                    <div className="form-row">
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
                </div>
            )}

            <div
                style={{
                    width: size.width,
                    height: size.height,
                    backgroundColor: values['background-color'],
                    backgroundImage: image ? `url(${image})` : 'none',
                }}
                className="preview"
            >
                <h2
                    style={{
                        color: values['title-color'],
                        fontSize: Number(values['title-size']) || 34,
                        fontFamily: values['title-font'],
                    }}
                >
                    {values.title || "Hi, I'm Atanas Atanasov"}
                </h2>

                <p
                    style={{
                        color: values['subtitle-color'],
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
                    <div key={i} className="form-row">
                        <label>{group.label}</label>

                        {group.fields.map((field, j) =>
                            field.type === 'select' ? (
                                <select {...register(field.name)} key={j}>
                                    {field.options.map((option, k) => (
                                        <option value={option} key={k}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    key={j}
                                    min={field.min}
                                    max={field.max}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    defaultValue={
                                        field.value || field.placeholder
                                    }
                                    {...register(field.name)}
                                    {...(field.type === 'file'
                                        ? {
                                              onChange: (e) => {
                                                  onFileUpload(e, setImage);
                                              },
                                          }
                                        : {})}
                                />
                            ),
                        )}
                    </div>
                ))}

                <div className="form-actions">
                    <button type="submit">Finish</button>
                </div>
            </form>
        </>
    );
};
