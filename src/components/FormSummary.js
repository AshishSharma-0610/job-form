
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './JobApplicationForm.css';

const FormSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    const onReset = () => {
        navigate('/');
    };

    return (
        <div className="form-container">
            <div className="card">
                <div className="card-header">
                    <h2 className="text-header">Application Summary</h2>
                </div>
                <div className="card-body">
                    <div className="summary">
                        <p><strong>Full Name:</strong> {data.fullName}</p>
                        <p><strong>Email:</strong> {data.email}</p>
                        <p><strong>Phone Number:</strong> {data.phoneNumber}</p>
                        <p><strong>Position:</strong> {data.position.label}</p>
                        {(data.position.value === 'developer' || data.position.value === 'designer') && (
                            <p><strong>Relevant Experience:</strong> {data.relevantExperience} years</p>
                        )}
                        {data.position.value === 'designer' && (
                            <p><strong>Portfolio URL:</strong> {data.portfolioUrl}</p>
                        )}
                        {data.position.value === 'manager' && (
                            <p><strong>Management Experience:</strong> {data.managementExperience}</p>
                        )}
                        <p><strong>Additional Skills:</strong> {data.additionalSkills.join(', ')}</p>
                        <p><strong>Preferred Interview Time:</strong> {data.preferredInterviewTime.toLocaleString()}</p>
                    </div>
                    <button className="btn" onClick={onReset}>Submit Another Application</button>
                </div>
            </div>
        </div>
    );
};

export default FormSummary;
