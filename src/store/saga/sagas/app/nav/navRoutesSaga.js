import { takeLatest } from "redux-saga/effects";
import { navRoutesActions } from "store/reducers/app/navigation/navRoutesReducer";
import { navRoutesHandlers } from "store/saga/handlers/app/nav";

export default function* navRoutesSaga() {
  yield takeLatest(
    navRoutesActions.createNavRoute,
    navRoutesHandlers.createNavRoute
  );
  yield takeLatest(
    navRoutesActions.updateNavRoute,
    navRoutesHandlers.updateNavRoute
  );
  yield takeLatest(
    navRoutesActions.deleteNavRoute,
    navRoutesHandlers.deleteNavRoute
  );
  yield takeLatest(
    navRoutesActions.getAllNavRoute,
    navRoutesHandlers.getAllNavRoute
  );
}
