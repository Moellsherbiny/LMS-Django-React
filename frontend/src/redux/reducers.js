import { 
  FETCH_COURSES_REQUEST, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAILURE,
  FETCH_ASSIGNMENTS_REQUEST, FETCH_ASSIGNMENTS_SUCCESS, FETCH_ASSIGNMENTS_FAILURE,
  FETCH_QUIZZES_REQUEST, FETCH_QUIZZES_SUCCESS, FETCH_QUIZZES_FAILURE,
} from './actions/appActions';

const initialCoursesState = {
  loading: false,
  courses: [],
  error: '',
};

export const coursesReducer = (state = initialCoursesState, action) => {
  switch(action.type) {
    case FETCH_COURSES_REQUEST:
      return { ...state, loading: true };
    case FETCH_COURSES_SUCCESS:
      return { loading: false, courses: action.payload, error: '' };
    case FETCH_COURSES_FAILURE:
      return { loading: false, courses: [], error: action.payload };
    default:
      return state;
  }
};

const initialAssignmentsState = {
  loading: false,
  assignments: [],
  error: '',
};

export const assignmentsReducer = (state = initialAssignmentsState, action) => {
  switch(action.type) {
    case FETCH_ASSIGNMENTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_ASSIGNMENTS_SUCCESS:
      return { loading: false, assignments: action.payload, error: '' };
    case FETCH_ASSIGNMENTS_FAILURE:
      return { loading: false, assignments: [], error: action.payload };
    default:
      return state;
  }
};

const initialQuizzesState = {
  loading: false,
  quizzes: [],
  error: '',
};

export const quizzesReducer = (state = initialQuizzesState, action) => {
  switch(action.type) {
    case FETCH_QUIZZES_REQUEST:
      return { ...state, loading: true };
    case FETCH_QUIZZES_SUCCESS:
      return { loading: false, quizzes: action.payload, error: '' };
    case FETCH_QUIZZES_FAILURE:
      return { loading: false, quizzes: [], error: action.payload };
    default:
      return state;
  }
};
