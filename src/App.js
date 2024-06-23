import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobApplicationForm from './components/JobApplicationForm';
import FormSummary from './components/FormSummary';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobApplicationForm />} />
        <Route path="/summary" element={<FormSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
