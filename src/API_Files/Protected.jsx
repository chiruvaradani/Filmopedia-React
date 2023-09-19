import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  console.log(props);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);


  return localStorage.getItem('token') ? <Component /> : null;
};

export default Protected;