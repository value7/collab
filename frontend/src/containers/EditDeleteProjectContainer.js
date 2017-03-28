import EditDeleteProjectForm from '../components/EditDeleteProjectForm.js';
import { connect } from 'react-redux';
import { requestDeleteProject } from '../actions/projects'

const mapDispatchToProps = (dispatch) => {
  return {
   resetMe: () =>{
    //sign up is not reused, so we dont need to resetUserFields
    //in our case, it will remove authenticated users
      // dispatch(resetUserFields());
    },
    onDeleteProject: (id) => {
      dispatch(requestDeleteProject(id))
    }
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state);
  console.log(ownProps);
  return {
    initialValues: state.projects.projects[ownProps.params.projectId]
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteProjectForm);
