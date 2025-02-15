# GasByGas Backend Service

## Overview
Backend service for GasByGas - a comprehensive LP gas cylinder distribution and tracking system serving Sri Lanka. This system enables online gas cylinder requests, token management, and delivery tracking across multiple outlet locations.

## Features
- Customer registration and identity verification
- Token generation and management
- Delivery scheduling and tracking
- SMS/Email notification system
- Outlet inventory management
- Business/Industrial customer handling
- Real-time stock monitoring
- Token verification and validation
- Payment processing integration

## Tech Stack
- Programming Language: Java Script
- Framework: Express js
- Database: Mongo DB
- Authentication: Json Web Token

## Prerequisites
```
[List your prerequisites here]
- Node.js v16+
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gasbygas-backend.git
cd gasbygas-backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.development.loval
```

5. Start the server
```bash
npm run dev
```

## API Documentation

### Authentication
- POST `/api/auth/register` - Customer registration
- POST `/api/auth/login` - User login
- POST `/api/auth/verify` - Verify user identity

### Token Management
- POST `/api/tokens/generate` - Generate new gas request token
- GET `/api/tokens/status/:id` - Check token status
- PUT `/api/tokens/update/:id` - Update token status

### Outlet Management
- GET `/api/outlets` - List all outlets
- GET `/api/outlets/:id/inventory` - Get outlet inventory
- POST `/api/outlets/:id/schedule` - Create delivery schedule

## Security Features
- Identity verification system
- Request limiting and rate throttling
- Data encryption
- Role-based access control
- Session management
- Input validation and sanitization

## Testing
```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Generate test coverage report
npm run test:coverage
```

## License
[Add your license information here]

## Contact
[Add your contact information here]
