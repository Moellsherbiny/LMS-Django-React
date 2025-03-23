import axios from 'axios';

// Courses actions
export const FETCH_COURSES_REQUEST = 'FETCH_COURSES_REQUEST';
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
export const FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE';

export const fetchCourses = () => async (dispatch) => {
  dispatch({ type: FETCH_COURSES_REQUEST });
  try {
    const res = await axios.get('/courses/');
    dispatch({ type: FETCH_COURSES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_COURSES_FAILURE, payload: error.message });
  }
};

// Assignments actions
export const FETCH_ASSIGNMENTS_REQUEST = 'FETCH_ASSIGNMENTS_REQUEST';
export const FETCH_ASSIGNMENTS_SUCCESS = 'FETCH_ASSIGNMENTS_SUCCESS';
export const FETCH_ASSIGNMENTS_FAILURE = 'FETCH_ASSIGNMENTS_FAILURE';

export const fetchAssignments = () => async (dispatch) => {
  dispatch({ type: FETCH_ASSIGNMENTS_REQUEST });
  try {
    const res = await axios.get('/assignments/');
    dispatch({ type: FETCH_ASSIGNMENTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_ASSIGNMENTS_FAILURE, payload: error.message });
  }
};

// Quizzes actions
export const FETCH_QUIZZES_REQUEST = 'FETCH_QUIZZES_REQUEST';
export const FETCH_QUIZZES_SUCCESS = 'FETCH_QUIZZES_SUCCESS';
export const FETCH_QUIZZES_FAILURE = 'FETCH_QUIZZES_FAILURE';

export const fetchQuizzes = () => async (dispatch) => {
  dispatch({ type: FETCH_QUIZZES_REQUEST });
  try {
    const res = await axios.get('/quizzes/');
    dispatch({ type: FETCH_QUIZZES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_QUIZZES_FAILURE, payload: error.message });
  }
};
