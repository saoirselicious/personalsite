import React, { createContext, useContext, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from '@mui/material'; // Ensure you import Box if you're using a library like MUI


// Define the type for children
type LoadingProviderProps = { children: React.ReactNode };

// Create contexts
const LoadingContext = createContext<{ loading: boolean; setLoading: React.Dispatch<React.SetStateAction<boolean>> } | null>(null);
const ErrorContext = createContext<{ error: boolean; setError: React.Dispatch<React.SetStateAction<boolean>> } | null>(null);
const AuthContext = createContext<{ authError: boolean; setAuthError: React.Dispatch<React.SetStateAction<boolean>> } | null>(null);
const NotFoundContext = createContext<{ notFound: boolean; setNotFound: React.Dispatch<React.SetStateAction<boolean>> } | null>(null);

// Providers
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const ErrorProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [error, setError] = useState<boolean>(false);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const AuthProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [authError, setAuthError] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ authError, setAuthError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const NotFoundProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [notFound, setNotFound] = useState<boolean>(false);

    return (
        <NotFoundContext.Provider value={{ notFound, setNotFound }}>
            {children}
        </NotFoundContext.Provider>
    );
};

// Custom hooks
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === null) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (context === null) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const useNotFound = () => {
    const context = useContext(NotFoundContext);
    if (context === null) {
        throw new Error("useNotFound must be used within a NotFoundProvider");
    }
    return context;
};

// LoadingSplash Component
export const LoadingSplash: React.FC = () => {
    const { loading } = useLoading();
    const [size, setSize] = useState<number>(50);

    useEffect(() => {
        function updateSize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const newSize = Math.min(width, height) / 8;
            setSize(newSize);
        }

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    if (!loading) return null;

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="75vh"
        >
            <CircularProgress size={size} />
            <br />
            <h6>Please Wait...</h6>
        </Box>
    );
};

// AuthSplash Component
export const AuthSplash: React.FC = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="75vh"
        >
            <h1>Access Denied</h1>
            <h6>
                You are not authorized to see this page. Please contact the application admin for further information.
            </h6>
            <br />
            <a
                href="/"
                className="appListBlueButton"
                style={{ textDecoration: "none" }}
                type="button"
            >
                Go to Homepage
            </a>
        </Box>
    );
};

export function NotFoundSplash() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="75vh"
        >
            <h1>Not Found</h1>
            <h6>
                The page you are searching for cannot be found. Please contact the application admin for further information.
            </h6>
            <br />
            <a
                href="/"
                className="appListBlueButton"
                style={{ textDecoration: "none" }}
                type="button"
            >
                Go to Homepage
            </a>
        </Box>
    );
}

export function ErrorSplash() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="75vh"
        >
            <h1>There has been an error</h1>
            <h6>
                Please try again later as there was an error retrieving the necessary data for this page.
            </h6>
        </Box>
    );
}
