import React from 'react';
import ProfileMessageList from '../containers/ProfileMessageList'
import UserAside from './UserAside';

const ProfileTimeline = props => {
	return (
		<div className='row'>
			<UserAside
				profileImageUrl={props.profileImageUrl}
				username={props.username}
			/>
			<ProfileMessageList />
		</div>
	);
};

export default ProfileTimeline;
