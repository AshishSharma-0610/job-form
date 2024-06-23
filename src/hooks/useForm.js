
import { useState } from 'react';

const useForm = ({ initialValues, validate, onSubmit }) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const setFieldValue = (name, value) => {
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(values);
        }
    };

    return { values, errors, handleChange, handleSubmit, setFieldValue };
};

export default useForm;
