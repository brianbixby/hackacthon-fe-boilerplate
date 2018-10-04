let validateUserProfile = userProfile => {
  if(!userProfile.userID || !userProfile.username){
    throw  new Error('VALIDATION ERROR: user profile requires a photo or bio');
  }
};

export default (state=null, action) => {
  let { type, payload } = action;

  switch(type) {
    case 'USERPROFILE_CREATE':
      validateUserProfile(payload);
      return payload;
    case 'USERPROFILE_UPDATE':
      if(!state) throw new Error('USAGE ERROR: can not update when user profile is null');
      validateUserProfile(payload);
      return {...state, ...payload};
    case 'USERPROFILE_FETCH':
      return payload;
    case 'SIGN_OUT':
      return null;
    default:
      return state;
  }
};