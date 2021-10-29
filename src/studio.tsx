import 'react-app-polyfill/ie11';
import 'normalize.css';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { Hint } from './hint';
import { Loader } from './loader';
import { onDownload } from './utils';
import { sizes, Field, fieldGroups, defaultValues } from './settings';

export const Studio = () => {
    const node = React.useRef<HTMLDivElement>(null);
    const [image, setImage] = React.useState('');
    const [network, setNetwork] = React.useState('');
    const [customWidth, setCustomWidth] = React.useState(1500);
    const [customHeight, setCustomHeight] = React.useState(500);
    const { watch, register, handleSubmit } = useForm({
        defaultValues,
    });

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const values = watch();

    const size: Record<'width' | 'height', number> = sizes[network] || {
        width: customWidth,
        height: customHeight,
    };

    const onChange = useDebouncedCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            setError(false);
            setLoading(true);

            const response = await fetch(
                `https://source.unsplash.com/${size.width}x${size.height}/?${e.target.value}`,
            ).catch(() => {
                setError(true);

                return {
                    url: '',
                };
            });

            setImage(response.url);

            setLoading(false);
        },
        500,
    );

    return (
        <div className="studio">
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
                ref={node}
                style={{
                    width: size.width,
                    height: size.height,
                }}
                className={`preview${!!image ? ' preview--tinted' : ''}`}
            >
                {loading && <Loader />}

                <div
                    className="preview__background"
                    style={{
                        filter: `blur(${values['background-blur']}px)`,
                        backgroundColor: values['background-color'],
                        backgroundImage: !!image ? `url(${image})` : 'none',
                    }}
                />

                <div className="preview__content">
                    {!!values.title && (
                        <h2
                            style={{
                                color: values['title-color'],
                                fontSize: Number(values['title-size']) || 34,
                                fontFamily: values['title-font'],
                            }}
                        >
                            {values.title}
                        </h2>
                    )}

                    {!!values.subtitle && (
                        <p
                            style={{
                                color: values['subtitle-color'],
                                fontSize: Number(values['subtitle-size']) || 14,
                                fontFamily: values['subtitle-font'],
                            }}
                        >
                            {values.subtitle}
                        </p>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit(() => onDownload(node.current))}>
                {fieldGroups.map((group, i) => (
                    <div key={i} className="form-row">
                        <label>
                            {group.label}

                            {!!group.labelHint && (
                                <small>
                                    <em> {group.labelHint}</em>
                                </small>
                            )}

                            <Hint group={group} values={values} />
                        </label>

                        {group.fields.map((field: Field, j) =>
                            field.type === 'select' ? (
                                <select {...register(field.name)} key={j}>
                                    {field.options?.map((option, k) => (
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
                                    {...(field.type === 'search'
                                        ? {
                                              onChange,
                                              disabled: loading,
                                              className: error
                                                  ? 'has--error'
                                                  : undefined,
                                          }
                                        : {})}
                                />
                            ),
                        )}

                        {!!group.hint && <small>{group.hint}</small>}
                    </div>
                ))}

                <div className="form-actions">
                    <button type="submit">Download</button>
                </div>
            </form>
        </div>
    );
};
