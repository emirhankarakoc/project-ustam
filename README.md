# Ustam: Find Mechanics

This is a service marketplace demo for customers and mechanics. The Spring Boot backend has accounts, mechanic skills and locations, appointments, and reviews. There are also React web and React Native mobile apps.

## Code

- `backend/` has the API, MySQL data, JWT access rules, and Socket.IO code.
- `frontend/` has the web app.
- `mobile/` has the mobile app.

The backend is the most complete part. Some web and mobile screens are still unfinished.

## Run locally

You need Java, MySQL, and Node.js. Set your database details, `DB_PASSWORD`, `JWT_SECRET`, and `DEMO_USER_PASSWORD`. Images and email need your own Cloudinary and SMTP settings, including `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `MAIL_PASSWORD`.

```bash
cd backend
./mvnw spring-boot:run
```

Use the scripts in each client folder to start the web or mobile app, and point it to your local API.

I built this around a problem in car repair: finding a mechanic with the right skills. It is a prototype, not a live booking or payment service. Replace any old credentials from Git history if they were used on real accounts.
