const express = require('express');
const router = express.Router({mergeParams: true});

const { addFollower, getFollower, getFollowers, deleteFollower } = require('../handlers/followers');

// prefixed with /api/user/:id/followers
router.route('/').get(getFollowers);

// prefixed with /api/user/:id/followers/:follower_id
router
	.route('/:follower_id')
	.post(addFollower)
	.get(getFollower)
	.delete(deleteFollower);

module.exports = router;
