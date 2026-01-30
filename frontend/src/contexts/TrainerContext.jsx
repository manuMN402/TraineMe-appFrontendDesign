import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/apiService';
import { useAuth } from './AuthContext';

/**
 * Trainer Context
 * Manages trainer-related data and operations
 */
const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
  const { token } = useAuth();
  const [trainers, setTrainers] = useState([]);
  const [currentTrainer, setCurrentTrainer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  /**
   * Get all trainers with optional filters
   */
  const getAllTrainers = useCallback(
    async (filters = {}) => {
      setLoading(true);
      try {
        const response = await api.trainer.getAllTrainers({
          ...filters,
          page: filters.page || 1,
          limit: filters.limit || 10,
        });

        setTrainers(response.trainers || []);
        setPagination(response.pagination || {});
        return response;
      } catch (error) {
        console.error('Error fetching trainers:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Search trainers by criteria
   */
  const searchTrainers = useCallback(
    async (specialty, minPrice, maxPrice, page = 1, limit = 10) => {
      return getAllTrainers({
        specialty,
        minPrice,
        maxPrice,
        page,
        limit,
      });
    },
    [getAllTrainers]
  );

  /**
   * Get trainer profile by ID
   */
  const getTrainerProfile = useCallback(async (trainerId) => {
    setLoading(true);
    try {
      const response = await api.trainer.getProfile(trainerId);
      setCurrentTrainer(response);
      return response;
    } catch (error) {
      console.error('Error fetching trainer profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create trainer profile (for TRAINER users)
   */
  const createTrainerProfile = useCallback(
    async (trainerData) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.trainer.createProfile(trainerData, token);
        setCurrentTrainer(response.trainerProfile);
        return response;
      } catch (error) {
        console.error('Error creating trainer profile:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Update trainer profile
   */
  const updateTrainerProfile = useCallback(
    async (trainerData) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.trainer.updateProfile(trainerData, token);
        setCurrentTrainer(response.trainerProfile);
        return response;
      } catch (error) {
        console.error('Error updating trainer profile:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Delete trainer profile
   */
  const deleteTrainerProfile = useCallback(async () => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await api.trainer.deleteProfile(token);
      setCurrentTrainer(null);
      return response;
    } catch (error) {
      console.error('Error deleting trainer profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const value = {
    trainers,
    currentTrainer,
    loading,
    pagination,
    getAllTrainers,
    searchTrainers,
    getTrainerProfile,
    createTrainerProfile,
    updateTrainerProfile,
    deleteTrainerProfile,
  };

  return (
    <TrainerContext.Provider value={value}>{children}</TrainerContext.Provider>
  );
};

/**
 * Hook to use Trainer context
 */
export const useTrainer = () => {
  const context = useContext(TrainerContext);
  if (!context) {
    throw new Error('useTrainer must be used within TrainerProvider');
  }
  return context;
};

export default TrainerContext;
