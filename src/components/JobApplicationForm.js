
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import FormField from './FormField';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './JobApplicationForm.css';

const positions = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
];

const skills = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'css', label: 'CSS' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React' },
    { value: 'node', label: 'Node.js' },
];
const CheckboxGroup = ({ options, values, onChange, error }) => (
    <div className="checkbox-group">
        {options.map((option) => (
            <label key={option.value} className="checkbox-label">
                <input
                    type="checkbox"
                    value={option.value}
                    checked={values.includes(option.value)}
                    onChange={onChange}
                />
                {option.label}
            </label>
        ))}
        {error && <span className="error">{error}</span>}
    </div>
);

const JobApplicationForm = () => {
    const navigate = useNavigate();
    const { values, errors, handleChange, handleSubmit, setFieldValue } = useForm({
        initialValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            position: null,
            relevantExperience: '',
            portfolioUrl: '',
            managementExperience: '',
            additionalSkills: [],
            preferredInterviewTime: null,
        },
        validate: (values) => {
            const errors = {};
            if (!values.fullName) errors.fullName = 'Full Name is required';
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Email is invalid';
            }
            if (!values.phoneNumber) {
                errors.phoneNumber = 'Phone Number is required';
            } else if (!/^\d+$/.test(values.phoneNumber)) {
                errors.phoneNumber = 'Phone Number must be a valid number';
            }
            if (!values.position) errors.position = 'Position is required';
            if ((values.position?.value === 'developer' || values.position?.value === 'designer') && !values.relevantExperience) {
                errors.relevantExperience = 'Relevant Experience is required';
            } else if (values.relevantExperience && Number(values.relevantExperience) <= 0) {
                errors.relevantExperience = 'Relevant Experience must be greater than 0';
            }
            if (values.position?.value === 'designer' && !values.portfolioUrl) {
                errors.portfolioUrl = 'Portfolio URL is required';
            } else if (values.portfolioUrl && !/^https?:\/\/.+\..+/.test(values.portfolioUrl)) {
                errors.portfolioUrl = 'Portfolio URL must be a valid URL';
            }
            if (values.position?.value === 'manager' && !values.managementExperience) {
                errors.managementExperience = 'Management Experience is required';
            }
            if (values.additionalSkills.length === 0) {
                errors.additionalSkills = 'At least one skill must be selected';
            }
            if (!values.preferredInterviewTime) {
                errors.preferredInterviewTime = 'Preferred Interview Time is required';
            }
            return errors;
        },
        onSubmit: (values) => {
            console.log('Form submitted:', values);
            navigate('/summary', { state: values });
        },
    });
    const handleSkillsChange = (event) => {
        const skill = event.target.value;
        const updatedSkills = values.additionalSkills.includes(skill)
            ? values.additionalSkills.filter(s => s !== skill)
            : [...values.additionalSkills, skill];
        setFieldValue('additionalSkills', updatedSkills);
    };


    return (
        <div className="form-container">
            <div className="card">
                <div className="card-header">
                    <h2 className="text-header">Job Application Form</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <FormField
                            label="Full Name"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                        />
                        <FormField
                            label="Email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <FormField
                            label="Phone Number"
                            name="phoneNumber"
                            type="tel"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            error={errors.phoneNumber}
                        />
                        <div className="form-group">
                            <label>Applying for Position</label>
                            <Select
                                options={positions}
                                value={values.position}
                                onChange={(selectedOption) => setFieldValue('position', selectedOption)}
                            />
                            {errors.position && <span className="error">{errors.position}</span>}
                        </div>
                        {(values.position?.value === 'developer' || values.position?.value === 'designer') && (
                            <FormField
                                label="Relevant Experience (years)"
                                name="relevantExperience"
                                type="number"
                                value={values.relevantExperience}
                                onChange={handleChange}
                                error={errors.relevantExperience}
                            />
                        )}
                        {values.position?.value === 'designer' && (
                            <FormField
                                label="Portfolio URL"
                                name="portfolioUrl"
                                value={values.portfolioUrl}
                                onChange={handleChange}
                                error={errors.portfolioUrl}
                            />
                        )}
                        {values.position?.value === 'manager' && (
                            <FormField
                                label="Management Experience"
                                name="managementExperience"
                                as="textarea"
                                value={values.managementExperience}
                                onChange={handleChange}
                                error={errors.managementExperience}
                            />
                        )}
                        <div className="form-group">
                            <label>Additional Skills</label>
                            <CheckboxGroup
                                options={skills}
                                values={values.additionalSkills}
                                onChange={handleSkillsChange}
                                error={errors.additionalSkills}
                            />

                        </div>
                        <div className="form-group">
                            <label>Preferred Interview Time</label>
                            <DatePicker
                                selected={values.preferredInterviewTime}
                                onChange={(date) => setFieldValue('preferredInterviewTime', date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                            {errors.preferredInterviewTime && <span className="error">{errors.preferredInterviewTime}</span>}
                        </div>
                        <button type="submit" className="btn">Submit Application</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApplicationForm;
