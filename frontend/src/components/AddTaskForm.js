import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import { addTask, addTaskSuccess, addTaskFailure } from '../actions/tasks';
import renderDatePicker from './renderDatePicker';
import moment from 'moment';

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Task Title';
    hasErrors = true;
  }
  if (!values.description || values.description.trim() === '') {
    errors.description = 'Enter a Description for the Task';
    hasErrors = true;
  }
  return hasErrors && errors;
}

//For any field errors upon submission (i.e. not instant check)
const validateAndAddTask = (values, dispatch, props) => {
  console.log(props);
  values.projectId = props.params.projectId;
  return dispatch(addTask(values))
    .then((result) => {
      console.log(result);
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(addTaskFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
        //TODO this does nothing when the server dies...
      }

      //Store JWT Token to browser session storage
      //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
      //sessionStorage = persisted only in current tab
      //let other components know that everything is fine by updating the redux` state
      dispatch(addTaskSuccess(result.payload.data));//ps: this is same as dispatching RESET_USER_FIELDS
      browserHistory.push("/projects/" + props.params.projectId + "/tasks/" + result.payload.data.id);
      //browserHistory.push("/projects/" + result.payload.data.rows[0].id);
    });
};


class AddTaskForm extends Component {
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
    if ( nextProps.tasks.state === 'succeeded') {
      //this.context.router.push('/');
      console.log('successfully added the task');
    }
  }

  render() {
    console.log(this.props);
    const { handleSubmit, submitting } = this.props;
    return (
      <div className='container'>
        <form onSubmit={ handleSubmit(validateAndAddTask) }>
          <Field
                 name="title"
                 type="text"
                 component={ renderField }
                 label="title" />
          <Field
                 name="imgurLink"
                 type="text"
                 component={ renderField }
                 label="imgur Link" />
          <Field
                 name="description"
                 type="text"
                 component={ renderField }
                 label="Description" />
          <Field
                  name="startDate"
                  type="date"
                  component={ renderField }
                  label="startDate" />
          <Field
                  name="endDate"
                  type="date"
                  component={ renderField }
                  label="endDate" />
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
  form: 'AddTaskForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(AddTaskForm)
