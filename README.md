# Shop Owner User Management System

A full-stack user management system built with NestJS and Nuxt.js, designed for shop owners to manage users, staff, and multiple shops. The entire application runs in Docker containers with hot reload enabled for rapid development.

## Features

- User authentication with JWT
- Role-based access control (Super Admin, Shop Owner, Manager, Staff)
- User management (CRUD operations)
- Shop management (CRUD operations)
- Responsive UI with Tailwind CSS
- Real-time data updates
- Docker containerized with hot reload
- PostgreSQL database

## Technology Stack

### Backend
- NestJS (Node.js framework)
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- bcrypt for password hashing

### Frontend
- Nuxt.js 3 (Vue 3)
- TypeScript
- Pinia (State Management)
- Axios (HTTP Client)
- Tailwind CSS

### DevOps
- Docker & Docker Compose
- Hot reload for development

## Prerequisites

Before you begin, ensure you have installed:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker and Docker Compose)
- [Git](https://git-scm.com/downloads)

## Quick Start

### 1. Clone or Navigate to the Project

```bash
cd xxx\learning\textbook-web-nestjs
```

### 2. Start the Application

```bash
docker-compose up --build
```

This command will:
- Build the backend and frontend Docker images
- Start PostgreSQL database
- Start NestJS backend on port 3000
- Start Nuxt.js frontend on port 3001
- Enable hot reload for both services

### 3. Wait for Services to Start

The first time you run the application, it will take a few minutes to:
- Download Docker images
- Install npm dependencies
- Build the applications

You'll see logs indicating when services are ready:
- Backend: "Application is running on: http://[::1]:3000"
- Frontend: "Nuxt 3.x.x is ready"

### 4. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000/api

### 5. Create Your First User

Since the database is empty, you need to create an admin user first.

**Option 1: Using curl (Command Line)**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\",\"firstName\":\"Admin\",\"lastName\":\"User\",\"role\":\"super_admin\"}"
```

**Option 2: Using Postman or any API client**

POST to `http://localhost:3000/api/users` with body:
```json
{
  "email": "admin@example.com",
  "password": "admin123",
  "firstName": "Admin",
  "lastName": "User",
  "role": "super_admin"
}
```

**Option 3: Using PowerShell (Windows)**

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"email":"admin@example.com","password":"admin123","firstName":"Admin","lastName":"User","role":"super_admin"}'
```

### 6. Login

Go to http://localhost:3001/login and use:
- **Email**: admin@example.com
- **Password**: admin123

## Development

### Hot Reload

Both frontend and backend support hot reload:

**Backend**: Edit any file in `./backend/src/` and the server will automatically restart

**Frontend**: Edit any file in `./frontend/` and the browser will automatically refresh

### View Logs

```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend

# Database only
docker-compose logs -f postgres
```

### Stop the Application

```bash
# Stop containers (data persists)
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

### Restart a Specific Service

```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart postgres
```

## Project Structure

```
textbook-web-nestjs/
├── backend/                    # NestJS backend
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── guards/        # Auth guards
│   │   │   ├── strategies/    # Passport strategies
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── users/             # Users module
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── shops/             # Shops module
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── shops.controller.ts
│   │   │   ├── shops.service.ts
│   │   │   └── shops.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
├── frontend/                   # Nuxt.js frontend
│   ├── pages/
│   │   ├── index.vue          # Dashboard
│   │   └── login.vue          # Login page
│   ├── stores/
│   │   ├── auth.ts            # Auth store
│   │   ├── users.ts           # Users store
│   │   └── shops.ts           # Shops store
│   ├── middleware/
│   │   └── auth.ts            # Auth middleware
│   ├── plugins/
│   │   └── api.ts             # Axios setup
│   ├── Dockerfile
│   ├── package.json
│   ├── nuxt.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── docs/
│   └── SPECIFICATION.md        # Detailed technical specification
│
├── docker-compose.yml
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get current user (protected)

### Users
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `POST /api/users` - Create user
- `PATCH /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Shops
- `GET /api/shops` - Get all shops (protected)
- `GET /api/shops/:id` - Get shop by ID (protected)
- `POST /api/shops` - Create shop (protected)
- `PATCH /api/shops/:id` - Update shop (protected)
- `DELETE /api/shops/:id` - Delete shop (protected)

## Database Access

### Connect to PostgreSQL

```bash
# Using Docker
docker exec -it shop-postgres psql -U shopowner -d shop_management

# Common commands
\dt          # List tables
\d users     # Describe users table
\d shops     # Describe shops table
SELECT * FROM users;
SELECT * FROM shops;
```

### Database Credentials

- **Host**: localhost
- **Port**: 5432
- **Database**: shop_management
- **Username**: shopowner
- **Password**: shopowner123

## User Roles

1. **Super Admin** - Full system access
2. **Shop Owner** - Manage own shop and users
3. **Manager** - Manage staff, limited permissions
4. **Staff** - Basic access

## Troubleshooting

### Port Already in Use

If ports 3000, 3001, or 5432 are already in use:

1. Stop the conflicting service, or
2. Edit `docker-compose.yml` to use different ports:
   ```yaml
   ports:
     - "3002:3000"  # Backend
     - "3003:3001"  # Frontend
     - "5433:5432"  # PostgreSQL
   ```

### Cannot Connect to Database

```bash
# Check if PostgreSQL container is running
docker ps

# Check PostgreSQL logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### Frontend Cannot Connect to Backend

1. Check backend logs: `docker-compose logs backend`
2. Verify backend is running: `curl http://localhost:3000/api`
3. Check API base URL in frontend config

### Hot Reload Not Working

```bash
# Rebuild containers
docker-compose down
docker-compose up --build
```

### Reset Everything

```bash
# Stop containers and remove all data
docker-compose down -v

# Remove Docker images
docker-compose down --rmi all

# Start fresh
docker-compose up --build
```

## Testing the API

### Using curl

```bash
# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","firstName":"Test","lastName":"User","role":"staff"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Get users (with token)
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the API endpoints
2. Create an environment variable for the token
3. Test all endpoints

## Learning Resources

### NestJS
- [Official Documentation](https://docs.nestjs.com/)
- [NestJS Course](https://www.udemy.com/course/nestjs-zero-to-hero/)

### Nuxt.js
- [Official Documentation](https://nuxt.com/docs)
- [Nuxt 3 Tutorial](https://vueschool.io/courses/nuxt-js-3-fundamentals)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Docker
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Next Steps

1. **Explore the Code**: Review the backend and frontend code structure
2. **Add Features**: Try adding new features like:
   - User profile editing
   - Password change functionality
   - Email notifications
   - Advanced filtering and search
   - Data export to CSV
3. **Learn Testing**: Add unit and integration tests
4. **Deploy**: Deploy to a cloud platform (AWS, Azure, Google Cloud)

## Security Notes

**Important**: This is a development setup. For production:

1. Change the JWT secret to a secure random string
2. Use environment variables (not hardcoded values)
3. Enable HTTPS with SSL certificates
4. Set up proper CORS configuration
5. Implement rate limiting
6. Add input sanitization
7. Use strong passwords
8. Enable database encryption
9. Set up monitoring and logging
10. Regular security updates

## Contributing

This is a learning project. Feel free to:
- Experiment with the code
- Add new features
- Improve the documentation
- Share your learnings

## License

MIT License - Feel free to use this project for learning purposes.

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review Docker logs
3. Verify your Docker installation
4. Check that all ports are available

## Documentation

For detailed technical information, see:
- [Technical Specification](./docs/SPECIFICATION.md)
- [Backend API Documentation](http://localhost:3000/api) (when running)

---

**Happy Learning!**

This project demonstrates full-stack development with modern technologies. Take your time to understand each component and experiment with the code.
