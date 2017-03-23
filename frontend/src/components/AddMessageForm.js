import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import { addMessage, addMessageSuccess, addMessageFailure } from '../actions/chats';

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  console.log(values);
  if (!values.message || values.message.trim() === '') {
    errors.message = 'Enter a Message';
    hasErrors = true;
  }
  return hasErrors && errors;
}

//For any field errors upon submission (i.e. not instant check)
const validateAndAddTask = (values, dispatch, props) => {
  console.log(props);
  values.projectId = props.projectId;
  values.taskId = props.taskId;
  return dispatch(addMessage(values))
    .then((result) => {
      console.log(result);
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(addMessageFailure(result.payload.response.data, props.projectId, props.taskId));
        throw new SubmissionError(result.payload.response.data);
        //TODO this does nothing when the server dies...
      }

      //Store JWT Token to browser session storage
      //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
      //sessionStorage = persisted only in current tab
      //let other components know that everything is fine by updating the redux` state
      dispatch(addMessageSuccess(result.payload.data, props.projectId, props.taskId));//ps: this is same as dispatching RESET_USER_FIELDS
      props.reset('AddMessageForm');
      //browserHistory.push("/projects/" + result.payload.data.rows[0].id);
    });
};


class AddMessageForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // if ( nextProps.AddMessage.state === 'succeeded') {
    //   //this.context.router.push('/');
    //   console.log('successfully added the message');
    // }
  }

  render() {
    console.log(this.props);
    const {asyncValidating, handleSubmit, submitting, validate} = this.props;
    return (
      <div className='container'>
        <form onSubmit={ handleSubmit(validateAndAddTask) }>
          <Field
                 name="message"
                 type="text"
                 component={ renderField } />
          <div>
            <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }>
              Submit
            </button>
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
  form: 'AddMessageForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(AddMessageForm)
