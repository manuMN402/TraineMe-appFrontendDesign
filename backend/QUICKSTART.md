# TraineMe Backend API Documentation

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup PostgreSQL database**
   - Create a PostgreSQL database: `traineme_db`
   - Update `.env` with your connection string

3. **Run Prisma migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed sample data (optional)**
   ```bash
   npm run seed
   ```

5. **Start server**
   ```bash
   npm run dev
   ```

## Default Test Credentials

After running the seed script, you can test with:

**Regular User:**
- Email: user1@example.com
- Password: password123

**Trainer:**
- Email: trainer1@example.com
- Password: password123

## API Base URL
```
http://localhost:3000/api
```

## Key Features

✅ User Authentication (JWT)
✅ Trainer Profile Management
✅ Availability Scheduling
✅ Session Booking System
✅ Review & Rating System
✅ Search & Filter Trainers
✅ Booking Status Management

## Database Models

1. **User** - Authentication & profile
2. **TrainerProfile** - Trainer details
3. **Availability** - Trainer availability slots
4. **Booking** - Session bookings
5. **Review** - Reviews & ratings
6. **Message** - User messages (future use)

## Response Format

All API responses follow this format:

**Success:**
```json
{
  "message": "Success message",
  "data": { ... }
}
```

**Error:**
```json
{
  "error": "Error message"
}
```

## Next Steps

1. Connect frontend to this API
2. Update frontend .env with backend URL
3. Implement real-time features (optional)
4. Add email notifications (optional)
5. Deploy to production server

---

For detailed documentation, see [README.md](./README.md)
