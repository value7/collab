import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import { validateUserFields, validateUserFieldsSuccess, validateUserFieldsFailure, resetValidateUserFields } from '../actions/validateUserFields';
import { signUpUser, signUpUserSuccess, signUpUserFailure, } from '../actions/user';

import styled from 'styled-components';

const Button = styled.button`
  user-select: none;
  background: none;
  border: 1px solid transparent;
  border-radius: 0.3em;
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  line-height: 2.3em;
  height: 2.4em;
  margin-bottom: 0;
  overflow: hidden;
  padding: 0 1em;
  text-align: center;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  -webkit-appearance: none;
  background-image: -webkit-linear-gradient(top, #fafafa 0%, #eaeaea 100%);
  background-image: -o-linear-gradient(top, #fafafa 0%, #eaeaea 100%);
  background-image: linear-gradient(to bottom, #fafafa 0%, #eaeaea 100%);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffafafa', endColorstr='#ffeaeaea', GradientType=0);
  border: 1px solid #ccc;
  border-color: #ccc #bdbdbd #adadad;
  color: #333;
  text-shadow: 0 1px 0 white;
  font-size: 1.25rem;
`;

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Enter Confirm Password';
    hasErrors = true;
  }

  if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password And Confirm Password don\'t match';
    errors.password = 'Password And Confirm Password don\'t match';
    hasErrors = true;
  }
  return hasErrors && errors;
}



// //For instant async server validation
const asyncValidate = (values, dispatch) => {
  return dispatch(validateUserFields(values))
    .then((result) => {
      console.log(result);
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let {data, status} = result.payload.response;

      //if status is not 200 or any one of the fields exist, then there is a field error
      if (status != 200 || data.username || data.email) {
        //let other components know of error by updating the redux` state
        dispatch(validateUserFieldsFailure(data));
        throw { username: 'That username is taken' };
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validateUserFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });
};



//For any field errors upon submission (i.e. not instant check)
const validateAndSignUpUser = (values, dispatch) => {
  return dispatch(signUpUser(values))
    .then((result) => {
      console.log(result);
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(signUpUserFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }

      //Store JWT Token to browser session storage
      //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
      //sessionStorage = persisted only in current tab
      //let other components know that everything is fine by updating the redux` state
      dispatch(signUpUserSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
    });
};


class SignUpForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.context.router.push('/');
    }
  }

  render() {
    const {asyncValidating, handleSubmit, submitting, asyncValidate, validate} = this.props;
    return (
      <div className='container'>
        <form onSubmit={ handleSubmit(validateAndSignUpUser) }>
          <Field
                 name="username"
                 type="text"
                 component={ renderField }
                 label="Username" />
          <Field
                 name="password"
                 type="password"
                 component={ renderField }
                 label="Password" />
          <Field
                 name="confirmPassword"
                 type="password"
                 component={ renderField }
                 label="Confirm Password*" />
          <div>
            <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }>
              Submit
            </Button>
            <Link
                  to="/"
                  className="btn btn-error"> Cancel
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'SignUpForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  asyncValidate
})(SignUpForm)
