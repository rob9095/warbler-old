const express = require('express');
const router = express.Router({mergeParams: true});

const { getFollowing } = require('../handlers/followers');

// prefixed with /api/user/:id/following
router.route('/').get(getFollowing);


module.exports = router;