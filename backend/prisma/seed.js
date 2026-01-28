const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../src/utils/auth');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await prisma.message.deleteMany();
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.availability.deleteMany();
    await prisma.trainerProfile.deleteMany();
    await prisma.user.deleteMany();

    // Create seed users
    const user1Password = await hashPassword('password123');
    const user2Password = await hashPassword('password123');
    const trainer1Password = await hashPassword('password123');
    const trainer2Password = await hashPassword('password123');

    // Regular users
    const user1 = await prisma.user.create({
      data: {
        email: 'user1@example.com',
        password: user1Password,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        role: 'USER',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'user2@example.com',
        password: user2Password,
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+0987654321',
        role: 'USER',
      },
    });

    // Trainers
    const trainer1User = await prisma.user.create({
      data: {
        email: 'trainer1@example.com',
        password: trainer1Password,
        firstName: 'Mike',
        lastName: 'Johnson',
        phone: '+1111111111',
        role: 'TRAINER',
      },
    });

    const trainer2User = await prisma.user.create({
      data: {
        email: 'trainer2@example.com',
        password: trainer2Password,
        firstName: 'Sarah',
        lastName: 'Williams',
        phone: '+2222222222',
        role: 'TRAINER',
      },
    });

    // Create trainer profiles
    const trainer1 = await prisma.trainerProfile.create({
      data: {
        userId: trainer1User.id,
        bio: 'Certified fitness trainer with 5 years of experience',
        specialty: 'Fitness',
        experience: 5,
        certification: 'NASM-CPT',
        hourlyRate: 50,
        rating: 4.5,
        reviewCount: 10,
      },
    });

    const trainer2 = await prisma.trainerProfile.create({
      data: {
        userId: trainer2User.id,
        bio: 'Yoga and pilates instructor specializing in flexibility',
        specialty: 'Yoga',
        experience: 7,
        certification: 'RYT-200',
        hourlyRate: 40,
        rating: 4.8,
        reviewCount: 15,
      },
    });

    // Create availabilities
    await prisma.availability.create({
      data: {
        trainerId: trainer1.id,
        day: 'MONDAY',
        startTime: '09:00',
        endTime: '17:00',
      },
    });

    await prisma.availability.create({
      data: {
        trainerId: trainer1.id,
        day: 'WEDNESDAY',
        startTime: '10:00',
        endTime: '18:00',
      },
    });

    await prisma.availability.create({
      data: {
        trainerId: trainer2.id,
        day: 'TUESDAY',
        startTime: '08:00',
        endTime: '16:00',
      },
    });

    await prisma.availability.create({
      data: {
        trainerId: trainer2.id,
        day: 'THURSDAY',
        startTime: '09:00',
        endTime: '17:00',
      },
    });

    // Create bookings
    const booking1 = await prisma.booking.create({
      data: {
        userId: user1.id,
        trainerId: trainer1.id,
        sessionDate: new Date('2026-02-05'),
        startTime: '10:00',
        endTime: '11:00',
        price: 50,
        status: 'CONFIRMED',
      },
    });

    const booking2 = await prisma.booking.create({
      data: {
        userId: user2.id,
        trainerId: trainer2.id,
        sessionDate: new Date('2026-02-10'),
        startTime: '14:00',
        endTime: '15:00',
        price: 40,
        status: 'PENDING',
      },
    });

    // Create reviews
    await prisma.review.create({
      data: {
        bookingId: booking1.id,
        trainerId: trainer1.id,
        rating: 5,
        comment: 'Great trainer! Very professional and knowledgeable.',
      },
    });

    console.log('✅ Database seeded successfully!');
    console.log('📊 Created:');
    console.log('   - 2 regular users');
    console.log('   - 2 trainers');
    console.log('   - 4 availabilities');
    console.log('   - 2 bookings');
    console.log('   - 1 review');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
