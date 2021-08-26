import { connect } from 'react-redux';
import Profiles from 'src/components/Profiles';

const mapStateToProps = (state) => ({
  users: state.users.users,
  user: state.users.user,
  connectedUserId: state.login.id,
  isLogged: state.login.isLogged,
  isDeleteModalClosed: state.settings.isDeleteModalClosed,
  editPhoto: state.users.editPhoto,
  editName: state.users.editName,
  editCity: state.users.editCity,
  editBirthdate: state.users.editBirthdate,
  editInstruments: state.users.editInstruments,
  editStyles: state.users.editStyles,
  editEmail: state.users.editEmail,
  editPassword: state.users.editPassword,
  editDescription: state.users.editDescription,
  firstName: state.users.user.firstName,
  lastName: state.users.user.lastName,
  dateOfBirth: state.users.user.dateOfBirth,
  emailInput: state.users.user.email,
  password: state.users.user.user_password,
  description: state.users.user.user_description,
  passwordShown: state.login.passwordShown,
  city: state.users.city,

});

const mapDispatchToProps = (dispatch) => ({
  getOneMember: () => {
    dispatch({ type: 'GET_ONE_MEMBER' });
  },
  onWishToDeleteProfile: () => {
    dispatch({ type: 'DELETE_PROFILE_WISH' });
  },
  onDeleteProfile: () => {
    dispatch({ type: 'SAID_YES_TO_DELETE_PROFILE' });
  },
  editFormToggle: (key) => {
    dispatch({
      type: 'EDIT_FORM_TOGGLE',
      key,
    });
  },
  togglePasswordVisibility: () => {
    dispatch({ type: 'ON_PASSWORD_TOGGLE' });
  },
  onChangeProfileInput: (key, value) => {
    dispatch({
      type: 'CHANGE_INPUT_MODIFY_PROFILE',
      key,
      value,
    });
  },
  handleSubmitPhoto: (e, image) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_PHOTO', image });
  },
  handleSubmitName: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_NAME' });
  },
  handleSubmitEmail: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_EMAIL' });
  },
  handleSubmitBirthdate: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_BIRTHDATE' });
  },
  handleSubmitDescription: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_DESCRIPTION' });
  },
  handleSubmitPassword: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_PASSWORD' });
  },
  handleSubmitCity: (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_MODIFIED_CITY' });
  },
  onCityChange: (key, value) => {
    dispatch({
      type: 'CHANGE_CITY_INPUT',
      key,
      value,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);