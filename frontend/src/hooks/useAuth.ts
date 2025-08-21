import { useCallback, useEffect } from 'react';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { loginUser, logoutUser, checkAuthSession } from '../store/authSlice';
import type { LoginCredentials } from '../types/auth.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, accessToken } = useAppSelector((state) => state.auth);

  const login = useCallback(async (credentials: LoginCredentials) => {
    return dispatch(loginUser(credentials));
  }, [dispatch]);

  const logout = useCallback(async () => {
    return dispatch(logoutUser());
  }, [dispatch]);

  const checkSession = useCallback(async () => {
    return dispatch(checkAuthSession());
  }, [dispatch]);

  // Check for existing session on hook initialization
  useEffect(() => {
    if (!isAuthenticated) {
      checkSession();
    }
  }, [checkSession, isAuthenticated]);

  return {
    user,
    isAuthenticated,
    accessToken,
    login,
    logout,
    checkSession,
  };
};