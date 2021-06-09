import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

export const Input: React.FC<InputProps> = ({ name, ...props }) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <div className={styles.inputContainer}>
            { error && <span>{error}</span>}
            <input defaultValue={defaultValue} ref={inputRef} {...props} />
        </div>
    );
}