import { createContext} from "react";

interface AuthContextType {
    signIn: (newToken: string, callBack: () => void) => void;
    signOut: (callBack: () => void) => void;
    isLoggedIn: () => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({children}: Props) =>{
    const setToken = (newToken: string) => localStorage.setItem('auth-token', newToken);
    
    const getToken = () => localStorage.getItem('auth-token');
    
    const deleteToken = () => localStorage.removeItem('auth-token');
    
    const signIn = (newToken: string, callBack: () => void) => {
        setToken(newToken);
        callBack();
    }
    
    const signOut = (callBack: () => void) => {
        deleteToken();
        callBack();
    }

    const isLoggedIn = () => {
        if(getToken()){
            return true;
        }
        return false;
    };

    const value = {signIn, signOut, isLoggedIn}

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}