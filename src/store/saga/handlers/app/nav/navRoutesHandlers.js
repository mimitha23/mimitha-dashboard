import { call, put } from "redux-saga/effects";
import { errorController } from "store/saga/handlers/helpers";
import { navRoutesAPI } from "store/saga/api/app/nav";
import { navRoutesActions } from "store/reducers/app/navigation/navRoutesReducer";

export function* createNavRoute({ payload }) {
  try {
    yield call(navRoutesAPI.createNavRouteQuery, payload);
    yield put(navRoutesActions.resetFormState());
    yield put(navRoutesActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "createNavRouteHandler",
      errorSetter: navRoutesActions.setError,
    });
  }
}

export function* updateNavRoute({ payload }) {
  try {
    yield call(navRoutesAPI.updateNavRouteQuery, payload);
    yield put(navRoutesActions.resetFormState());
    yield put(navRoutesActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "updateNavRouteHandler",
      errorSetter: navRoutesActions.setError,
    });
  }
}

export function* deleteNavRoute({ payload }) {
  try {
    yield call(navRoutesAPI.deleteNavRouteQuery, payload);
    yield put(navRoutesActions.setDeletedRoute(payload._id));
    yield put(navRoutesActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "deleteNavRouteHandler",
      errorSetter: navRoutesActions.setError,
    });
  }
}

export function* getAllNavRoute() {
  try {
    const { data } = yield call(navRoutesAPI.getAllNavRouteQuery);
    yield put(navRoutesActions.setAllNavRoutes(data));
    yield put(navRoutesActions.setSuccess());
  } catch (error) {
    yield errorController({
      error,
      location: "getAllNavRoutesHandler",
      errorSetter: navRoutesActions.setError,
    });
  }
}
