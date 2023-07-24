const user = JSON.parse(localStorage.getItem('user'));
let initialState = {
  isAuthenticated: false,
  user: null,
};

if (user) {
    initialState = {
    isAuthenticated: true,
    user: {
      id: user.id,
      username: user.username,
    },
  };
}



const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
         ...state,
        isAuthenticated: true,
        user: {
          username: action.payload.username,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
