const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const JWT_SECRET = '3#12384ahjkhsjkbasdBBBHDFFH12'; // Change this to a secure key in production

app.use(bodyParser.json());

// Auth middleware to verify JWT
function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Attach decoded payload to request
        next();
    });
}


app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    // Dummy user check (replace with real authentication in production)
    if (username === 'hira' && password === '1234') {
        // Create JWT payload
        const payload = { username };
        // Sign JWT
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, you have access to this protected route!` });
});

app.get('/userdata', authMiddleware, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, you have access to this protected route!` });
});

app.get('/userdatatwo', authMiddleware, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, you have access to this protected route!` });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});