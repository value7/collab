import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: user => user.user,
  failureRedirectPath: '/signin',
})

//TODO sieht jeder eingeloggte
export const UserIsAdmin = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: user => user.isAdmin,
  allowRedirectBack: false
})

export const VisibleOnlyAdmin = UserAuthWrapper({
  authSelector: state => state.user,
  wrapperDisplayName: 'VisibleOnlyAdmin',
  predicate: user => user.isAdmin,
  FailureComponent: null
})

// export const VisibleOnlyProjectAdmin = UserAuthWrapper({
//   authSelector: state => state,
//   wrapperDisplayName: 'VisibleOnlyProjectAdmin',
//   predicate: state => state,
//   FailureComponent: null
// })

export const VisibleOnlyLoggedIn = UserAuthWrapper({
  authSelector: state => state.user,
  wrapperDisplayName: 'VisibleOnlyLoggedIn',
  predicate: user => user.user,
  FailureComponent: null
})
