import React from 'react';
import { Link } from 'react-router-dom';
import ProfileTimeline from './ProfileTimeline';


const UserProfile = ({ currentUser }) => {
	if(!currentUser.isAuthenticated){
		return (
			<div className="home-hero">
				<h1>What's Happening</h1>
				<h4>New to Warbler?</h4>
				<Link to="/signup" className="btn btn-primary">
					Sign up here
				</Link>
			</div>
		);
	}
	return (
		<ProfileTimeline
			profileImageUrl={currentUser.user.profileImageUrl}
			username={currentUser.user.username}
		/>
	);
};

export default UserProfile;
