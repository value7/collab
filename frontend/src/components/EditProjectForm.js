import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import { editProject, editProjectSuccess, editProjectFailure } from '../actions/projects';

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Project Title';
    hasErrors = true;
  }
  if (!values.description || values.description.trim() === '') {
    errors.description = 'Enter a Description for the Project';
    hasErrors = true;
  }
  return hasErrors && errors;
}

//For any field errors upon submission (i.e. not instant check)
const validateAndEditProject = (values, dispatch, props) => {
  console.log(props);
  values.projectId = props.params.projectId;
  return dispatch(editProject(values))
    .then((result) => {
      console.log(result);
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(editProjectFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }

      //Store JWT Token to browser session storage
      //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
      //sessionStorage = persisted only in current tab
      //let other components know that everything is fine by updating the redux` state
      dispatch(editProjectSuccess(result.payload.data));//ps: this is same as dispatching RESET_USER_FIELDS
      props.router.push("/projects/" + result.payload.data.id);
    });
};


class EditProjectForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   if ( nextProps.createProject.state === 'succeeded') {
  //     this.context.router.push('/');
  //   }
  // }

  render() {
    console.log(this.props);
    // TODO ich muss die daten laden wenn ich da herkomm
    const { handleSubmit, submitting } = this.props;
    return (
      <div className='container'>
        <form onSubmit={ handleSubmit(validateAndEditProject) }>
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
  form: 'EditProjectForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(EditProjectForm)
