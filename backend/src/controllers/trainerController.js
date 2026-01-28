const prisma = require('../config/database');

// Create trainer profile
const createTrainerProfile = async (req, res, next) => {
  try {
    const { bio, specialty, experience, certification, hourlyRate, profileImage, bannerImage } = req.body;

    // Check if trainer profile already exists
    const existingProfile = await prisma.trainerProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (existingProfile) {
      return res.status(400).json({ error: 'Trainer profile already exists' });
    }

    const trainerProfile = await prisma.trainerProfile.create({
      data: {
        userId: req.user.id,
        bio,
        specialty,
        experience: parseInt(experience),
        certification,
        hourlyRate: parseFloat(hourlyRate),
        profileImage,
        bannerImage,
      },
    });

    res.status(201).json({
      message: 'Trainer profile created successfully',
      trainerProfile,
    });
  } catch (error) {
    next(error);
  }
};

// Get trainer profile
const getTrainerProfile = async (req, res, next) => {
  try {
    const { trainerId } = req.params;

    const trainerProfile = await prisma.trainerProfile.findUnique({
      where: { id: trainerId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        availabilities: true,
      },
    });

    if (!trainerProfile) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    res.json(trainerProfile);
  } catch (error) {
    next(error);
  }
};

// Update trainer profile
const updateTrainerProfile = async (req, res, next) => {
  try {
    const { bio, specialty, experience, certification, hourlyRate, profileImage, bannerImage } = req.body;

    const trainerProfile = await prisma.trainerProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!trainerProfile) {
      return res.status(404).json({ error: 'Trainer profile not found' });
    }

    const updated = await prisma.trainerProfile.update({
      where: { id: trainerProfile.id },
      data: {
        bio: bio || undefined,
        specialty: specialty || undefined,
        experience: experience ? parseInt(experience) : undefined,
        certification: certification || undefined,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
        profileImage: profileImage || undefined,
        bannerImage: bannerImage || undefined,
      },
    });

    res.json({
      message: 'Trainer profile updated successfully',
      trainerProfile: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Get all trainers (with search and filter)
const getAllTrainers = async (req, res, next) => {
  try {
    const { specialty, minPrice, maxPrice, rating, page = 1, limit = 10 } = req.query;

    const where = {};

    if (specialty) {
      where.specialty = { contains: specialty, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      where.hourlyRate = {};
      if (minPrice) where.hourlyRate.gte = parseFloat(minPrice);
      if (maxPrice) where.hourlyRate.lte = parseFloat(maxPrice);
    }

    if (rating) {
      where.rating = { gte: parseFloat(rating) };
    }

    const trainers = await prisma.trainerProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            profileImage: true,
          },
        },
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
      orderBy: { rating: 'desc' },
    });

    const total = await prisma.trainerProfile.count({ where });

    res.json({
      trainers,
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

module.exports = {
  createTrainerProfile,
  getTrainerProfile,
  updateTrainerProfile,
  getAllTrainers,
};
