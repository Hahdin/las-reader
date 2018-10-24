import { combineReducers } from 'redux';

import { files } from './file.reducers';
import { chart } from './chart.reducers';
// import { registration } from './registration.reducer';
// import { users } from './users.reducer';
// import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  files,
  chart,
  // authentication,
  // registration,
  // users,
  // alert
});

export default rootReducer;