# Ustam: Find Mechanics

This is a service marketplace demo for customers and mechanics. The Spring Boot backend has accounts, mechanic skills and locations, and appointments. There are also React web and React Native mobile apps.

## Code

- `backend/` has the API, MySQL data, JWT access rules, and Socket.IO code.
- `frontend/` has the web app.
- `mobile/` has the mobile app.

## Run locally

You need Java, MySQL, and Node.js. Set your database details, `DB_PASSWORD`, `JWT_SECRET`, and `DEMO_USER_PASSWORD`. Images and email need your own Cloudinary and SMTP settings, including `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `MAIL_PASSWORD`.

```bash
cd backend
./mvnw spring-boot:run
```

For the web app, run `npm install` and `npm start` in `frontend/`. For the Expo mobile app, run `npm install` and `npm start` in `mobile/`. Point each client to your local API.

I built this around a problem in car repair: finding a mechanic with the right skills.
