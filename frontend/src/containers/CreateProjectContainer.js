import CreateProjectForm from '../components/CreateProjectForm.js';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
   resetMe: () =>{
    //sign up is not reused, so we dont need to resetUserFields
    //in our case, it will remove authenticated users
     // dispatch(resetUserFields());
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    createProject: state.createProject
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectForm);
