
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../../../utils/is-authenticated"

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />
  }
  return null
}

export default ProtectedRoute
