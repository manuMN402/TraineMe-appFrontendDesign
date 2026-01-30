import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/apiService';
import { useAuth } from './AuthContext';

/**
 * Review Context
 * Manages trainer reviews and ratings
 */
const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const { token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  /**
   * Create review for a booking
   */
  const createReview = useCallback(
    async (reviewData) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.review.createReview(reviewData, token);
        setCurrentReview(response.review);
        return response;
      } catch (error) {
        console.error('Error creating review:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Get trainer reviews with pagination
   */
  const getTrainerReviews = useCallback(
    async (trainerId, filters = {}) => {
      setLoading(true);
      try {
        const response = await api.review.getTrainerReviews(trainerId, {
          page: filters.page || 1,
          limit: filters.limit || 10,
        });

        setReviews(response.reviews || []);
        setPagination(response.pagination || {});
        return response;
      } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Update review
   */
  const updateReview = useCallback(
    async (reviewId, reviewData) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.review.updateReview(reviewId, reviewData, token);

        // Update reviews list
        setReviews((prev) =>
          prev.map((r) => (r.id === reviewId ? response.review : r))
        );

        return response;
      } catch (error) {
        console.error('Error updating review:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Delete review
   */
  const deleteReview = useCallback(
    async (reviewId) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.review.deleteReview(reviewId, token);

        // Remove from list
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));

        return response;
      } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const value = {
    reviews,
    currentReview,
    loading,
    pagination,
    createReview,
    getTrainerReviews,
    updateReview,
    deleteReview,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};

/**
 * Hook to use Review context
 */
export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used within ReviewProvider');
  }
  return context;
};

export default ReviewContext;
