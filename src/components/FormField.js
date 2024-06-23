// FormField.js
import React from 'react';

const FormField = ({ label, name, type = 'text', as, value, onChange, error }) => {
    const InputComponent = as || 'input';

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <InputComponent
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={error ? 'input-error' : ''}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default FormField;