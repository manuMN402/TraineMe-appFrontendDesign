import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/apiService';
import { useAuth } from './AuthContext';

/**
 * Booking Context
 * Manages booking-related data and operations
 */
const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { token } = useAuth();
  const [userBookings, setUserBookings] = useState([]);
  const [trainerBookings, setTrainerBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userPagination, setUserPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });
  const [trainerPagination, setTrainerPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  /**
   * Create new booking
   */
  const createBooking = useCallback(
    async (bookingData) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.booking.createBooking(bookingData, token);
        setCurrentBooking(response.booking);
        return response;
      } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Get user bookings (for USER role)
   */
  const getUserBookings = useCallback(
    async (filters = {}) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.booking.getUserBookings(
          {
            status: filters.status || '',
            page: filters.page || 1,
            limit: filters.limit || 10,
          },
          token
        );

        setUserBookings(response.bookings || []);
        setUserPagination(response.pagination || {});
        return response;
      } catch (error) {
        console.error('Error fetching user bookings:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Get trainer booking requests (for TRAINER role)
   */
  const getTrainerBookings = useCallback(
    async (filters = {}) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.booking.getTrainerBookings(
          {
            status: filters.status || '',
            page: filters.page || 1,
            limit: filters.limit || 10,
          },
          token
        );

        setTrainerBookings(response.bookings || []);
        setTrainerPagination(response.pagination || {});
        return response;
      } catch (error) {
        console.error('Error fetching trainer bookings:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Update booking status (for TRAINER role)
   */
  const updateBookingStatus = useCallback(
    async (bookingId, status) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.booking.updateBookingStatus(
          bookingId,
          status,
          token
        );

        // Update bookings list
        setTrainerBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? response.booking : b))
        );

        return response;
      } catch (error) {
        console.error('Error updating booking status:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Cancel booking
   */
  const cancelBooking = useCallback(
    async (bookingId) => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }

        const response = await api.booking.cancelBooking(bookingId, token);

        // Update bookings lists
        setUserBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? response.booking : b))
        );
        setTrainerBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? response.booking : b))
        );

        return response;
      } catch (error) {
        console.error('Error cancelling booking:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const value = {
    userBookings,
    trainerBookings,
    currentBooking,
    loading,
    userPagination,
    trainerPagination,
    createBooking,
    getUserBookings,
    getTrainerBookings,
    updateBookingStatus,
    cancelBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

/**
 * Hook to use Booking context
 */
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export default BookingContext;
