import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {

  const isAuth = !!localStorage.getItem('token')

  if(!isAuth) {
    return <Navigate to="/login" replace />
  }

  return children;
}

export default ProtectedRoute