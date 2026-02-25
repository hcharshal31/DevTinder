## API's to be made

authRoutes
- POST - /signup
- POST - /login
- POST - /logout

profileRoutes
- GET - /profile
- POST - /profile
- PATCH - /profile

Statuses
ignore,  interested, accepted, rejected

connectionRequestRoutes
- POST - request/send/interested/:userId
- POST - request/send/ignored/:userId
- POST - request/send/accepted/:userId
- POST - request/send/rejected/:userId

userRoutes
- GET - /user/connections
- GET - /user/requests
- GET - /user/feed
