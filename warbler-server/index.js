require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const followersRoutes = require('./routes/followers');
const followingRoutes = require('./routes/following');
const messagesRoutes = require('./routes/messages');
const db = require("./models");
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const PORT = 8081;

app.use(cors())
app.use(bodyParser.json());

// all routes here


app.use('/api/auth', authRoutes);
app.use(
	'/api/users/:id/messages',
	loginRequired,
	ensureCorrectUser,
	messagesRoutes);

app.use(
		'/api/users/:id/followers',
		loginRequired,
		ensureCorrectUser,
		followersRoutes);
app.use(
		'/api/users/:id/following',
		loginRequired,
		ensureCorrectUser,
		followingRoutes);

app.get('/api/messages', loginRequired, async function(req, res, next) {
	try {
		let messages = await db.Message.find()
		.sort({ createdAt: 'desc'})
		.populate('user', {
			username: true,
			profileImageUrl: true
		});
		return res.status(200).json(messages);
	} catch(err) {
		return next(err);
	}
});

app.use(errorHandler);

app.listen(PORT, function(){
	console.log(`Server starting on port ${PORT}`)
});
