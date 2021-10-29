import * as React from 'react';

import { FieldGroup } from './settings';

interface Props {
    group: FieldGroup;
    values: Record<string, string>;
}

export const Hint: React.FC<Props> = ({ group, values }: Props) => {
    const field = group.fields.find(
        (field) => field.type === 'color' || field.type === 'range',
    );

    if (!field) {
        return null;
    }

    if (field.type === 'color') {
        return <small>{values[field.name]}</small>;
    }

    return <small>{values[field.name]}px</small>;
};
