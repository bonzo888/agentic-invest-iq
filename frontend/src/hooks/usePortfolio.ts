import { useCallback, useEffect } from 'react';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { fetchPortfolio, updatePosition, clearError } from '../store/portfolioSlice';

export const usePortfolio = () => {
  const dispatch = useAppDispatch();
  const { portfolio, positions, loading, error, lastUpdated } = useAppSelector(
    (state) => state.portfolio
  );

  const loadPortfolio = useCallback(async () => {
    return dispatch(fetchPortfolio());
  }, [dispatch]);

  const refreshPosition = useCallback(
    async (symbol: string, data: any) => {
      dispatch(updatePosition({ symbol, data }));
    },
    [dispatch]
  );

  const clearPortfolioError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Auto-load portfolio when hook is used
  useEffect(() => {
    if (!portfolio && !loading) {
      loadPortfolio();
    }
  }, [portfolio, loading, loadPortfolio]);

  return {
    portfolio,
    positions,
    loading,
    error,
    lastUpdated,
    loadPortfolio,
    refreshPosition,
    clearError: clearPortfolioError,
  };
};