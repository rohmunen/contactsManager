import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "../../stores/authStore";

export const ProtectedRoute = (props: React.PropsWithChildren) => {
  const { children } = props
  let location = useLocation();
  if (!authStore.init) {
    return <Navigate to="/" state={ { from: location } } replace />;
  }
  return children;
};