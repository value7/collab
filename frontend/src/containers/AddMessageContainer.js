import AddMessageForm from '../components/AddMessageForm.js';
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
  console.log(state);
  console.log(ownProps);
  return {
    chat: state.chat,
    projectId: ownProps.projectId,
    taskId: ownProps.taskId
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMessageForm);
