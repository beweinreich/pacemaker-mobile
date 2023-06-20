const initialState = {
  agreedToTerms: false,
  onboardingComplete: false,
  photosCaptured: 0,
};


export default function settings(state=initialState, action) {
  switch (action.type) {
    case 'AGREED_TO_TERMS':
      return {
        ...state,
        agreedToTerms: true
      }
    case 'COMPLETED_ONBOARDING':
      return {
        ...state,
        onboardingComplete: true
      }
    case 'INCREMENT_PHOTOS_CAPTURED':
      return {
        ...state,
        photosCaptured: state.photosCaptured+1,
      }
    default:
      return state;
  }
}
