// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
    rest.post('/api/auth/login', (req, res, ctx) => {
        const { email, password } = req.body;
        if (email === 'student@myschool.edu' && password === 'password123') {
            return res(
                ctx.status(200),
                ctx.json({ token: 'fake-jwt-token', role: 'STUDENT' })
            );
        }
        return res(
            ctx.status(401),
            ctx.json({ message: 'Invalid credentials' })
        );
    }),
    // Add more handlers as needed
];