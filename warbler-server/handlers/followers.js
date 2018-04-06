const db = require('../models');

// POST - /api/users/:id/followers/:follower_id
exports.addFollower = async function(req, res, next) {
	try {
		// make sure both users exist
		let foundUserFollowed = await db.User.findById(req.params.id);
		let foundUserFollowing = await db.User.findById(req.params.follower_id);
		if (foundUserFollowed === null || foundUserFollowing === null) {
			return next({
				status: 400,
				message: 'User not found!'
			});
		}
		// create follower, username is unique
		let follower = await db.Follower.create({
			username: foundUserFollowing.username,
			userFollowed: foundUserFollowed._id,
			userFollowing: foundUserFollowing._id
		});
		// make sure follower was created
		let foundFollower = await db.Follower.findById(follower._id);
			// .populate('userFollowed', {
				// username: true,
				// profileImageUrl: true
			// });
		// if follower was created/found push followers and followee to the users
		if (foundFollower != null) {
			foundUserFollowed.followers.push(req.params.follower_id);
			foundUserFollowing.following.push(req.params.id);
			await foundUserFollowed.save();
			await foundUserFollowing.save();
		}
		return res.status(200).json(foundFollower);
	} catch(err) {
		if(err.code === 11000) {
			err.message = 'User already followed';
		}
		return next(err);
	}
};

// GET a single follower for user - /api/users/:id/followers/:follower_id
exports.getFollower = async function(req, res, next) {
	try {
		let follower = await db.Follower.findById(req.params.follower_id);
		return res.status(200).json(follower)
	} catch(err) {
		return next(err);
	}
};

// GET all followers for user - /api/users/:id/followers
exports.getFollowers = async function(req, res, next) {
	try {
		let user = await db.User.findById(req.params.id);
		return res.status(200).json(user.followers)
	} catch(err) {
		return next(err);
	}
};

// GET all followering user - /api/users/:id/followers
exports.getFollowing = async function(req, res, next) {
	try {
		let user = await db.User.findById(req.params.id);
		return res.status(200).json(user.following)
	} catch(err) {
		return next(err);
	}
};

// DELETE follower from user - /api/users/:id/followers/:follower_id
exports.deleteFollower = async function(req, res, next) {
	try {
		let foundFollower = await db.Follower.findById(req.params.follower_id);
		await foundFollower.remove();
		return res.status(200).json(foundFollower);
	} catch(err) {
		return next(err);
	}
};
