import { configureStore } from '@reduxjs/toolkit';
import adminslice from '../slices/data';


export const store = configureStore({
  reducer: {
    admin: adminslice,
  },
});

// The following lines are TypeScript specific and can be removed in JavaScript
// If you need to infer types in JavaScript, you would typically do that in a different way, 
// but since JavaScript doesn't have static types, you can just use the store directly.