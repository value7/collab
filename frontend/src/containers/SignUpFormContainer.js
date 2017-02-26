import SignUpForm from '../components/SignUpForm.js';
import { resetValidateUserFields } from '../actions/validateUserFields';
import { connect } from 'react-redux';



const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetValidateUserFields());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    validateFields: state.validateFields,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
