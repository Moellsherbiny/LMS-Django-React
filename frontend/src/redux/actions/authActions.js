// authActions.js
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REQUEST" });

    // Replace with actual API call
    // const res = await axios.post('/api/auth/login', credentials);

    // Simulating successful login for demo
    const userData = {
      id: 1,
      name: "مستخدم تجريبي",
      email: credentials.email,
      role: "student",
    };

    localStorage.setItem("token", "demo-token");
    localStorage.setItem("user", JSON.stringify(userData));

    dispatch({
      type: "AUTH_SUCCESS",
      payload: userData,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_FAIL",
      payload: error.response?.data.message || "خطأ في تسجيل الدخول",
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REQUEST" });

    // Replace with actual API call
    // const res = await axios.post('/api/auth/register', userData);

    // Simulating successful registration for demo
    const newUser = {
      id: 2,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    };

    localStorage.setItem("token", "demo-token");
    localStorage.setItem("user", JSON.stringify(newUser));

    dispatch({
      type: "AUTH_SUCCESS",
      payload: newUser,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_FAIL",
      payload: error.response?.data.message || "خطأ في إنشاء الحساب",
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
};
