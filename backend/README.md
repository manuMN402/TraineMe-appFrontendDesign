# TraineMe Backend

A Node.js/Express backend for the TraineMe trainer booking application, built with Prisma and PostgreSQL.

## Features

- **Authentication**: User registration and login with JWT
- **Trainer Management**: Create and manage trainer profiles
- **Availability**: Manage trainer availability slots
- **Bookings**: Book sessions with trainers and manage booking status
- **Reviews**: Leave and manage reviews for trainers
- **Search & Filter**: Find trainers by specialty, price, and rating

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator

## Prerequisites

- Node.js 14.0.0 or higher
- PostgreSQL 12 or higher
- npm or yarn

## Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/traineme_db?schema=public"
   JWT_SECRET="your_secret_key_here"
   PORT=3000
   ```

4. **Setup Prisma**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

## Running the Server

### Development (with auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user/trainer
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Trainers
- `GET /api/trainers/search` - Search trainers (filters: specialty, minPrice, maxPrice, rating)
- `POST /api/trainers/profile` - Create trainer profile (protected, trainer only)
- `GET /api/trainers/profile/:trainerId` - Get trainer profile
- `PUT /api/trainers/profile` - Update trainer profile (protected, trainer only)

### Availability
- `GET /api/availability/:trainerId` - Get trainer availability slots
- `POST /api/availability` - Add availability slot (protected, trainer only)
- `DELETE /api/availability/:availabilityId` - Delete availability slot (protected, trainer only)

### Bookings
- `POST /api/bookings` - Create booking (protected, user only)
- `GET /api/bookings/user/history` - Get user's bookings (protected, user only)
- `GET /api/bookings/trainer/requests` - Get trainer's booking requests (protected, trainer only)
- `PUT /api/bookings/:bookingId/status` - Update booking status (protected, trainer only)
- `PUT /api/bookings/:bookingId/cancel` - Cancel booking (protected)

### Reviews
- `POST /api/reviews` - Create review (protected, user only)
- `GET /api/reviews/trainer/:trainerId` - Get trainer reviews
- `PUT /api/reviews/:reviewId` - Update review (protected)
- `DELETE /api/reviews/:reviewId` - Delete review (protected)

## Database Schema

### User
Stores user and trainer account information with roles.

### TrainerProfile
Extended profile for trainers with specialization and rating.

### Availability
Trainer availability slots by day and time.

### Booking
Session bookings between users and trainers.

### Review
Reviews and ratings for trainer sessions.

### Message
Messages between users and trainers.

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Database Management

### Generate Prisma Client
```bash
npm run prisma:generate
```

### Run Migrations
```bash
npm run prisma:migrate
```

### Open Prisma Studio
```bash
npm run prisma:studio
```

## Environment Variables

```
DATABASE_URL          PostgreSQL connection string
PORT                  Server port (default: 3000)
NODE_ENV              Environment (development/production)
JWT_SECRET            JWT signing secret
JWT_EXPIRE            JWT expiration time (default: 7d)
CORS_ORIGIN           Allowed CORS origins (comma-separated)
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/        # Business logic
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication, error handling
│   ├── config/            # Configuration files
│   ├── utils/             # Helper functions
│   └── server.js          # Express app setup
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Database seeding
├── .env                   # Environment variables
├── package.json           # Dependencies
└── README.md             # This file
```

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run database migrations
npm run prisma:migrate

# Seed database with sample data
npm run seed

# Generate Prisma client
npm run prisma:generate

# Open Prisma studio
npm run prisma:studio
```

## Testing

You can test the API using:
- Postman
- Insomnia
- cURL
- Thunder Client

Example request:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER"
  }'
```

## Troubleshooting

### Database connection issues
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

### Port already in use
- Change PORT in .env
- Or kill process using the port

### Prisma client not found
- Run `npm run prisma:generate`

## Support

For issues or questions, please create an issue in the repository.

## License

MIT License
