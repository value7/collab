import SignInForm from '../components/SignInForm.js';
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
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
