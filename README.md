# Ustam — Find Mechanics Around Me

A service marketplace prototype connecting customers with mechanics. The Spring Boot backend handles identities, mechanic skills and locations, appointments, and reviews. The repository also contains React web and React Native mobile clients.

## What is implemented
- Backend endpoints for accounts, mechanics, appointments, skills, provinces, and reviews
- Role-aware access with Spring Security/JWT
- MySQL persistence and Socket.IO integration
- Web and mobile client prototypes

The backend is the most complete part of this project. Some web and mobile flows remain incomplete; the mobile README features marked “waiting” are not presented as finished.

## Repository layout
- `backend/` — Spring Boot API
- `frontend/` — React web client
- `mobile/` — React Native client

## Local setup
Install Java, MySQL, and Node.js. Configure the database connection and provide `DB_PASSWORD`, `JWT_SECRET`, and `DEMO_USER_PASSWORD` in the environment. Cloudinary and mail integration require `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `MAIL_PASSWORD` when those flows are used. Configure the corresponding account names, hosts, and endpoints for your own services.

```bash
cd backend
./mvnw spring-boot:run
```

Use each client directory's package scripts to install dependencies and start that client. Set its API URL to the backend address.

## Engineering context
I built this around a real service discovery problem in automotive repair. It is a prototype; no booking or payment claim should be read as production deployment. Previously committed credential values remain in Git history and should be rotated if used on active accounts.
