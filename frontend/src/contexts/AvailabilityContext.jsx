import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/apiService';
import { useAuth } from './AuthContext';

/**
 * Availability Context
 * Manages trainer availability slots
 */
const AvailabilityContext = createContext();

export const AvailabilityProvider = ({ children }) => {
  const { token } = useAuth();
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Add availability slot
   */
  const addAvailability = useCallback(
    async (availabilityData) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.availability.addAvailability(
          availabilityData,
          token
        );

        setAvailabilities((prev) => [...prev, response.availability]);
        return response;
      } catch (error) {
        console.error('Error adding availability:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Get trainer availabilities
   */
  const getAvailabilities = useCallback(async (trainerId) => {
    setLoading(true);
    try {
      const response = await api.availability.getAvailabilities(trainerId);
      setAvailabilities(response || []);
      return response;
    } catch (error) {
      console.error('Error fetching availabilities:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete availability slot
   */
  const deleteAvailability = useCallback(
    async (availabilityId) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.availability.deleteAvailability(
          availabilityId,
          token
        );

        setAvailabilities((prev) =>
          prev.filter((a) => a.id !== availabilityId)
        );
        return response;
      } catch (error) {
        console.error('Error deleting availability:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const value = {
    availabilities,
    loading,
    addAvailability,
    getAvailabilities,
    deleteAvailability,
  };

  return (
    <AvailabilityContext.Provider value={value}>
      {children}
    </AvailabilityContext.Provider>
  );
};

/**
 * Hook to use Availability context
 */
export const useAvailability = () => {
  const context = useContext(AvailabilityContext);
  if (!context) {
    throw new Error(
      'useAvailability must be used within AvailabilityProvider'
    );
  }
  return context;
};

export default AvailabilityContext;
