import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";

import { tokenReducer } from "./token.slice";
import { userReducer } from "./user.slice";
import { productReducer } from "./product.slice";
import { orderReducer } from "./order.slice";
import { categoryReducer } from "./category.slice";
import { subCategoryReducer } from "./sub-category.slice";
import { paymentReducer } from "./payment.slice";

const middlewares: [any] = [thunkMiddleware];

export const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  product: productReducer,
  order: orderReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  payment: paymentReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(loggerMiddleware)
      .concat(middlewares),
  devTools: true, //change when deploying
});

export type IRootState = ReturnType<typeof rootReducer>;

export default store;