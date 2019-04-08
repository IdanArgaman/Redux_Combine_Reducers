import { combineReducers, createStore } from 'redux';

// Reducer 1-1
function discussionsListReducer(state = {}, { type, payload} = {}) {
  if (type === 'ADD') {
    return {
      ...state,
      [payload.id]: {
        id: payload.id,
        author: payload.author.id,
        content: payload.content,
      },
    };
  }
  return state;
}

// Reducer 1-2
function discussionsFilterRedcuer(state = '', { type, payload } = {}) {
  if (type === 'SET_FILTER') {
    return payload;
  }
  return state;
}

// First use of combine reducers, "discussions" is a reducer encapsulating these two reducers
const discussions = combineReducers({
  list: discussionsListReducer,
  filter: discussionsFilterRedcuer,
});

// Reducer 2-1
function authors(state = {}, { type, payload } = {}) {
  if (type === 'ADD') {
    return {
      ...state,
      [payload.author.id]: payload.author,
    };
  }
  return state;
}

// Second use of combine reducers, it uses the combined reducer above and 
// another reducer
const reducer = combineReducers({
  discussions,
  authors,
});

// Create a store supplying the above reducer
const store = createStore(reducer);

store.subscribe(() => {
  console.log('new state', store.getState());
});

const discussion = {
  id: 123,
  author: {
    id: 456,
    username: 'sergiodxa',
  },
  content: 'hola mundo',
};

console.log('initial state', store.getState());

// Handled by discussions -> discussionsListReducer to update state.discussions.list
store.dispatch({
  type: 'ADD',
  payload: discussion,
});

// Handled by discussions -> discussionsFilterRedcuer to update state.discussions.filter
store.dispatch({
  type: 'SET_FILTER',
  payload: 'new',
});

// Print
const el = document.getElementById('app');
el.innerText = JSON.stringify(store.getState(), undefined, 2)