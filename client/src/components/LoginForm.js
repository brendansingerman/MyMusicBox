// see SignupForm.js for comments
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData }
      });

      Auth.login(data.login.token);

    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    // Originally with Bootstrap
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Something went wrong with your login credentials!
      </Alert>
      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          type='text'
          placeholder='Your email'
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Your password'
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
      </Form.Group>
      <Button
        disabled={!(userFormData.email && userFormData.password)}
        type='submit'
        variant='success'>
        Submit
      </Button>
    </Form>
  </>
    // Convert to Tailwind
    // <>
    //   {/* Form from bootstrap to tailwind */}
    //   <form className='mb-4 flex flex-wrap' noValidate validated={validated} onSubmit={handleFormSubmit}>
    //     {/* Alert from bootstrap to tailwind */}
    //     <div className="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800" role="alert"dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
    //       Something went wrong with your login credentials!
    //     </div>
    //     {/* F-orm.Group from bootstrap to tailwind */}
    //     <div className='mb-4'>
    //       {/* Form.Label from bootstrap to tailwind */}
    //       <label htmlFor='email'>Email</label>
    //       {/* Form.Control from bootstrap to tailwind */}
    //       <input className='block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded'
    //         type='text'
    //         placeholder='Your email'
    //         name='email'
    //         onChange={handleInputChange}
    //         value={userFormData.email}
    //         required
    //       />
    //       {/* Form.Control.Feedback from bootstrap to tailwind */}
    //       <div className='block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded' type='invalid'>Email is required!</div>
    //     </div>
    //     {/* {/* F-orm.Group from bootstrap to tailwind */}
    //     <div className="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800" role="alert"dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
    //       {/* Form.Label from bootstrap to tailwind */}
    //       <label htmlFor='password'>Password</label>
    //       {/* Form.Control from bootstrap to tailwind */}
    //       <input className='block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded'
    //         type='password'
    //         placeholder='Your password'
    //         name='password'
    //         onChange={handleInputChange}
    //         value={userFormData.password}
    //         required
    //       />
    //       {/* Form.Control.Feedback from bootstrap to tailwind */}
    //       <div className='block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded' type='invalid'>Password is required!</div>
    //     </div>
    //     {/* Button from bootstrap to tailwind */}
    //     <button
    //       disabled={!(userFormData.email && userFormData.password)}
    //       type='submit'
    //       variant='success'>
    //       Submit
    //     </button>
    //   </form>
    // </>
  );
};

export default LoginForm;
