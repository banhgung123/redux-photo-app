import firebase from 'firebase';
import PropTypes from 'prop-types';
import { StyledFirebaseAuth } from 'react-firebaseui';

SignIn.propTypes = {
    
};

const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'redirect',
	signInSuccessUrl: '/photos',
	// We will display Google and Facebook as auth providers.
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignIn(props) {
    return (
        <div>
            <div className="text-center">
                <h2>Login Form</h2>

                <p>or Login with social accounts</p>
            </div>

            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
}

export default SignIn;