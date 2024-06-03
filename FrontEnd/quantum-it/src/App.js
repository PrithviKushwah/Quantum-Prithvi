import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import ProtectedTable from './components/ProtectedTable';

const App = () => {
  return (
   
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/protected" element={<ProtectedTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
};

const NotFound = () => {
  return <h1>404 - Not Found</h1>;
};

export default App;
