// import { createContext, useContext } from 'react';

// export const Authapi = createContext();
// export function useAuth() {
// 	return useContext(Authapi);
// }

const Auth = {
isAuthenticated: false,
authenticate() {
this.isAuthenticated = true;
},
signout() {
this.isAuthenticated = false;
},
getAuth() {
return this.isAuthenticated;
}
};
export default Auth;
