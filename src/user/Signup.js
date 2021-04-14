import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {

  const strength=undefined;
  const color=undefined;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password:"",
    error: "",
    success: false
  });

  const { name, email, password,confirm_password, error, success } = values;

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
    else if(!new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email))
    {
      setValues({ ...values, error: "email is not valid", success: false });
    }
    else if(new RegExp(/[0-9]/).test(password) && new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password) && new RegExp(/[!#@$%^&*)(+=._-]/).test(password))
    {
      signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            confirm_password:"",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
    }
    else{
      setValues({ ...values, error: "password must be contain spacial character, small and capital latter and number ", success: false });
    }
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Confirm Password</label>
              <input
                onChange={handleChange("confirm_password")}
                className="form-control"
                type="password"
                value={confirm_password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
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
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
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
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      
    </Base>
  );
};

export default Signup;
