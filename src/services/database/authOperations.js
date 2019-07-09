export default class AuthOperations {
  fAuth = null;
  constructor(fAuth, googleProvider,facebookProvider) {
    this.fAuth = fAuth;
    this.googleProvider=googleProvider;
    this.facebookProvider=facebookProvider;
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.fAuth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.fAuth.signOut();

  doPasswordReset = email => this.fAuth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.fAuth.currentUser.updatePassword(password);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.fAuth.createUserWithEmailAndPassword(email, password);

  doSignInWithGoogle=()=>{
    return this.fAuth.signInWithPopup(this.googleProvider);
  }
  doSignInWithFacebook=()=>{
    return this.fAuth.signInWithPopup(this.facebookProvider);
  }
}
