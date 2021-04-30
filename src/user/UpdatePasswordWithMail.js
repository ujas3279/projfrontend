import React, { useState } from "react";
import {  Redirect } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from './helper/FormContainer'
import { forgotPassword } from "./helper/userapicalls";
require('dotenv').config();
const UpdatePasswordWithMail = ({match}) => {
  console.log(match.params.userId);
  console.log(match.params.uniquestring);

  const [values, setValues] = useState({
    password: "",
    confirm_password:"",
    error: "",
    success: false,
    didRedirect: false,
    loading:false,
    formData: ""
  });

  const {password,loading,confirm_password, error, success, didRedirect,formData } = values;

  const handleChange = name => event => {


    setValues({ ...values, error: false, [name]: event.target.value });
  };

 
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    if(password!==confirm_password)
    {
      setValues({ ...values, error: "password and confirm password not match", success: false });
    }
    
    else if(new RegExp(/[0-9]/).test(password) && new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password) && new RegExp(/[!#@$%^&*)(+=._-]/).test(password))
    {
      setValues({...values,loading:true});
      forgotPassword(match.params.userId,match.params.uniquestring,{password})
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false,loading:false });
        } else {
          setValues({
            ...values,
            password: "",
            confirm_password:"",
            error: "",
            success: true,
            loading:false,
            didRedirect: false
          });
        }
      })
      .catch(console.log("Error in change password"));
    }
    else{
      setValues({ ...values, error: "password must be contain spacial character, small and capital latter and number ", success: false });
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/signin" />
    }
  };

  const changePasswordForm = () => {
    return (
      <FormContainer>
      <h1>Change Password</h1>
      <Form>
        

        <Form.Group controlId='password'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={handleChange("password")}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirm_password}
            onChange={handleChange("confirm_password")}
          ></Form.Control>
        </Form.Group>

        <Button onClick={onSubmit} type='submit' variant='primary' disabled={loading}>
        {loading && (<i className="fa fa-refresh fa-spin " style={{ marginRight:"5px"}}/>)}
          {!loading && <span>Change</span>}
          {loading && <span>Changing...</span>}
        </Button>
      </Form>

      
    </FormContainer>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Password Change Succesfully
            
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {successMessage()}
      {errorMessage()}
      {changePasswordForm()}
      {performRedirect()}
    </>
  );
};

export default UpdatePasswordWithMail;
