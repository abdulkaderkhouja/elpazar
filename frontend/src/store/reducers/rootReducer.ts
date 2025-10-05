import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import productReducer from './productReducer';
// import other reducers...

export const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  // other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
