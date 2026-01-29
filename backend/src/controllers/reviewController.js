import prisma from '../config/database.js';

// Create review
export const createReview = async (req, res, next) => {
  try {
    const { bookingId, rating, comment } = req.body;

    if (!bookingId || !rating) {
      return res.status(400).json({ error: 'BookingId and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check booking exists and belongs to user
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: { bookingId },
    });

    if (existingReview) {
      return res.status(400).json({ error: 'Review already exists for this booking' });
    }

    const review = await prisma.review.create({
      data: {
        bookingId,
        trainerId: booking.trainerId,
        rating,
        comment: comment || null,
      },
    });

    // Update trainer rating
    const reviews = await prisma.review.findMany({
      where: { trainerId: booking.trainerId },
    });

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await prisma.trainerProfile.update({
      where: { id: booking.trainerId },
      data: {
        rating: avgRating,
        reviewCount: reviews.length,
      },
    });

    res.status(201).json({
      message: 'Review created successfully',
      review,
    });
  } catch (error) {
    next(error);
  }
};

// Get trainer reviews
export const getTrainerReviews = async (req, res, next) => {
  try {
    const { trainerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const reviews = await prisma.review.findMany({
      where: { trainerId },
      include: {
        booking: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
          },
        },
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.review.count({ where: { trainerId } });

    res.json({
      reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update review
export const updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        booking: true,
      },
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.booking.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating: rating || undefined,
        comment: comment || undefined,
      },
    });

    res.json({
      message: 'Review updated successfully',
      review: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Delete review
export const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        booking: true,
      },
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.booking.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export default {
  createReview,
  getTrainerReviews,
  updateReview,
  deleteReview,
};
