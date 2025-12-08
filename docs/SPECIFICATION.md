# Shop Owner User Management System - Technical Specification

## 1. Overview

This is a full-stack user management system designed for shop owners to manage users, staff, and multiple shops. The system is built with modern technologies and containerized using Docker for easy deployment and development.

## 2. Technology Stack

### Backend
- **Framework**: NestJS (Node.js framework)
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: class-validator, class-transformer

### Frontend
- **Framework**: Nuxt.js 3 (Vue 3)
- **Language**: TypeScript
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **UI**: Responsive design with modern components

### DevOps
- **Containerization**: Docker & Docker Compose
- **Hot Reload**: Enabled for both frontend and backend
- **Database**: PostgreSQL container with persistent volume

## 3. System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  Nuxt.js        │────────▶│   NestJS        │────────▶│  PostgreSQL     │
│  Frontend       │  HTTP   │   Backend       │  SQL    │  Database       │
│  (Port 3001)    │  /API   │   (Port 3000)   │         │  (Port 5432)    │
│                 │◀────────│                 │◀────────│                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
     │                            │                            │
     │                            │                            │
     └────────────────────────────┴────────────────────────────┘
                         Docker Network
```

## 4. Database Schema

### Users Table
- **id**: UUID (Primary Key)
- **email**: String (Unique, Required)
- **password**: String (Hashed, Required)
- **firstName**: String (Required)
- **lastName**: String (Required)
- **phoneNumber**: String (Optional)
- **role**: Enum (super_admin, shop_owner, manager, staff)
- **status**: Enum (active, inactive, suspended)
- **shopId**: UUID (Foreign Key to Shops)
- **lastLoginAt**: Timestamp
- **createdAt**: Timestamp
- **updatedAt**: Timestamp

### Shops Table
- **id**: UUID (Primary Key)
- **name**: String (Unique, Required)
- **description**: Text (Optional)
- **address**: String (Optional)
- **phoneNumber**: String (Optional)
- **email**: String (Optional)
- **status**: Enum (active, inactive, suspended)
- **createdAt**: Timestamp
- **updatedAt**: Timestamp

### Relationships
- One Shop can have many Users
- One User belongs to one Shop (nullable)

## 5. API Endpoints

### Authentication
- **POST** `/api/auth/login` - User login
  - Body: `{ email, password }`
  - Returns: `{ access_token, user }`
  
- **GET** `/api/auth/profile` - Get current user profile (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: User object

### Users Management
- **GET** `/api/users` - Get all users (Protected)
- **GET** `/api/users/:id` - Get user by ID (Protected)
- **POST** `/api/users` - Create new user
  - Body: `{ email, password, firstName, lastName, phoneNumber?, role, status?, shopId? }`
- **PATCH** `/api/users/:id` - Update user (Protected)
- **DELETE** `/api/users/:id` - Delete user (Protected)

### Shops Management
- **GET** `/api/shops` - Get all shops (Protected)
- **GET** `/api/shops/:id` - Get shop by ID (Protected)
- **POST** `/api/shops` - Create new shop (Protected)
  - Body: `{ name, description?, address?, phoneNumber?, email?, status? }`
- **PATCH** `/api/shops/:id` - Update shop (Protected)
- **DELETE** `/api/shops/:id` - Delete shop (Protected)

## 6. User Roles & Permissions

### Super Admin
- Full system access
- Can manage all users and shops
- Can create/edit/delete any resource

### Shop Owner
- Can manage their own shop
- Can create/edit users for their shop
- Can view shop analytics

### Manager
- Can manage staff users
- Can view shop data
- Limited editing permissions

### Staff
- Basic access
- Can view assigned data
- No administrative privileges

## 7. Security Features

### Authentication
- JWT-based authentication
- Token expiration: 24 hours
- HTTP-only cookies for token storage
- Bearer token in Authorization header

### Password Security
- bcrypt hashing with salt rounds: 10
- Minimum password length: 6 characters
- Passwords never returned in API responses

### API Security
- CORS enabled for frontend origin
- Request validation using class-validator
- Protected routes require JWT authentication
- Input sanitization and validation

### Data Protection
- SQL injection prevention via TypeORM
- XSS protection through input validation
- Sensitive data excluded from responses

## 8. Frontend Features

### Pages
1. **Login Page** (`/login`)
   - Email and password authentication
   - Error handling and validation
   - Redirect to dashboard on success

2. **Dashboard** (`/`)
   - Statistics cards (Total Users, Total Shops)
   - Tabbed interface for Users and Shops
   - User profile display
   - Logout functionality

### User Management Interface
- User listing table with filters
- Add/Edit user modal form
- Delete user with confirmation
- Role and status badges with color coding
- Real-time data updates

### Shop Management Interface
- Shop listing table
- Add/Edit shop modal form
- Delete shop with confirmation
- User count per shop
- Status indicators

### State Management
- **Auth Store**: Login, logout, user profile, authentication state
- **Users Store**: CRUD operations for users
- **Shops Store**: CRUD operations for shops

### UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Loading states for async operations
- Error handling with user-friendly messages
- Modal forms for data entry
- Confirmation dialogs for destructive actions

## 9. Development Setup

### Prerequisites
- Docker Desktop installed
- Git installed
- Code editor (VS Code recommended)

### Hot Reload Configuration

#### Backend (NestJS)
- Uses `nest start --watch` command
- Automatically recompiles TypeScript on file changes
- Volume mounted: `./backend:/app`
- node_modules excluded from volume mounting

#### Frontend (Nuxt.js)
- Uses `nuxt dev` command
- Hot Module Replacement (HMR) enabled
- Volume mounted: `./frontend:/app`
- .nuxt and node_modules excluded from volume mounting

### Environment Variables

#### Backend (.env)
```
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=shopowner
DATABASE_PASSWORD=shopowner123
DATABASE_NAME=shop_management
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

#### Frontend
- API_BASE_URL configured in docker-compose.yml
- Runtime config in nuxt.config.ts

## 10. Docker Configuration

### Services
1. **postgres**: PostgreSQL database
   - Image: postgres:15-alpine
   - Port: 5432
   - Persistent volume for data

2. **backend**: NestJS application
   - Built from ./backend/Dockerfile
   - Port: 3000
   - Hot reload enabled

3. **frontend**: Nuxt.js application
   - Built from ./frontend/Dockerfile
   - Port: 3001
   - Hot reload enabled

### Network
- All services on `shop-network` bridge network
- Services can communicate using service names

## 11. Data Validation

### User Input Validation
- Email format validation
- Password minimum length (6 characters)
- Required field validation
- Enum value validation for role and status
- UUID format validation for IDs

### Business Logic Validation
- Unique email constraint
- Unique shop name constraint
- Foreign key validation for shop assignment
- User existence validation
- Shop existence validation

## 12. Error Handling

### Backend Error Types
- `NotFoundException`: Resource not found (404)
- `ConflictException`: Duplicate data (409)
- `UnauthorizedException`: Invalid credentials (401)
- `BadRequestException`: Validation errors (400)

### Frontend Error Handling
- API error interceptor
- 401 errors redirect to login
- User-friendly error messages
- Try-catch blocks for async operations

## 13. Testing Strategy

### Backend Testing
- Unit tests for services
- Integration tests for controllers
- E2E tests for API endpoints
- Test framework: Jest

### Frontend Testing (Future Enhancement)
- Component tests
- Store tests
- E2E tests with Playwright

## 14. Future Enhancements

### Phase 2 Features
- Email verification
- Password reset functionality
- Two-factor authentication
- Role-based UI rendering
- Advanced search and filtering
- Pagination for large datasets
- Export data to CSV/Excel
- Activity logs and audit trails
- User permissions system
- Shop analytics dashboard

### Phase 3 Features
- Multi-language support (i18n)
- Dark mode theme
- Mobile application (React Native)
- Real-time notifications (WebSocket)
- Advanced reporting
- API rate limiting
- Backup and restore functionality

## 15. Performance Considerations

### Database
- Indexes on frequently queried fields (email, shopId)
- Query optimization with TypeORM
- Connection pooling

### Frontend
- Lazy loading of routes
- Component code splitting
- Optimized bundle size
- Image optimization

### Backend
- Async/await for non-blocking operations
- Efficient query patterns
- Caching strategy (future)

## 16. Deployment Considerations

### Production Checklist
- [ ] Change JWT_SECRET to secure random string
- [ ] Set NODE_ENV=production
- [ ] Disable TypeORM synchronize (use migrations)
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up SSL certificates (HTTPS)
- [ ] Configure database backups
- [ ] Set up monitoring and logging
- [ ] Configure CORS for production domain
- [ ] Implement rate limiting
- [ ] Set up CI/CD pipeline

### Recommended Production Setup
- Use Docker Swarm or Kubernetes for orchestration
- Separate database server
- Load balancer for multiple instances
- CDN for static assets
- Logging service (ELK Stack, CloudWatch)
- Monitoring (Prometheus, Grafana)

## 17. Learning Objectives

This project demonstrates:
1. **NestJS Fundamentals**
   - Module architecture
   - Dependency injection
   - Controllers and services
   - DTOs and validation
   - TypeORM integration
   - Authentication with JWT
   - Guards and strategies

2. **Nuxt.js Fundamentals**
   - Pages and routing
   - Components
   - State management with Pinia
   - API integration
   - Middleware
   - Composables

3. **Full-Stack Integration**
   - REST API design
   - Authentication flow
   - State synchronization
   - Error handling
   - Form validation

4. **DevOps Basics**
   - Docker containerization
   - Docker Compose orchestration
   - Hot reload configuration
   - Environment management

## 18. Support and Documentation

### Official Documentation
- NestJS: https://docs.nestjs.com/
- Nuxt.js: https://nuxt.com/docs
- TypeORM: https://typeorm.io/
- Pinia: https://pinia.vuejs.org/
- Tailwind CSS: https://tailwindcss.com/docs

### Troubleshooting
- Check Docker container logs
- Verify environment variables
- Ensure ports are not in use
- Check database connection
- Verify API endpoints in browser DevTools

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Author**: Learning Project  
**License**: MIT
