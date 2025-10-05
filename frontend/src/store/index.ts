/*  The store folder contains the centralized state management logic for your app, it is where we define how the app's state
(data that changes over time) is stored, updated, and accessed accross components.
Typical contents of the store folder:
- index.ts or store.ts – creates and exports the Redux store.
- reducers/ folder – contains reducer functions that specify how state changes in response to actions.
- actions/ folder – contains action creators that describe the “events” that can modify the state.
- slices/ folder (Redux Toolkit) – combines reducer logic and actions in one place for each feature.
- types/ folder (optional) – defines TypeScript types or interfaces for state and actions.
*/

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

// Type helpers
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
