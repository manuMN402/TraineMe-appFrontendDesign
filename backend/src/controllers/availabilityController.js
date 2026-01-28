const prisma = require('../config/database');

// Add availability
const addAvailability = async (req, res, next) => {
  try {
    const { day, startTime, endTime } = req.body;

    const trainerProfile = await prisma.trainerProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!trainerProfile) {
      return res.status(404).json({ error: 'Trainer profile not found' });
    }

    // Check if availability already exists
    const existing = await prisma.availability.findUnique({
      where: {
        trainerId_day_startTime: {
          trainerId: trainerProfile.id,
          day,
          startTime,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'This time slot already exists' });
    }

    const availability = await prisma.availability.create({
      data: {
        trainerId: trainerProfile.id,
        day,
        startTime,
        endTime,
      },
    });

    res.status(201).json({
      message: 'Availability added successfully',
      availability,
    });
  } catch (error) {
    next(error);
  }
};

// Get trainer availabilities
const getAvailabilities = async (req, res, next) => {
  try {
    const { trainerId } = req.params;

    const availabilities = await prisma.availability.findMany({
      where: { trainerId },
      orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
    });

    res.json(availabilities);
  } catch (error) {
    next(error);
  }
};

// Delete availability
const deleteAvailability = async (req, res, next) => {
  try {
    const { availabilityId } = req.params;

    const availability = await prisma.availability.findUnique({
      where: { id: availabilityId },
      include: {
        trainer: true,
      },
    });

    if (!availability) {
      return res.status(404).json({ error: 'Availability not found' });
    }

    if (availability.trainer.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await prisma.availability.delete({
      where: { id: availabilityId },
    });

    res.json({ message: 'Availability deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAvailability,
  getAvailabilities,
  deleteAvailability,
};
