import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage } from '../store/actions/messages';
import { followUser, unFollowUser, fetchFollowers, fetchFollowing } from '../store/actions/followers';
import MessageItem from '../components/MessageItem';

class ProfileMessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() { 
    this.props.fetchMessages();
    this.props.fetchFollowers(this.props.currentUser);
    this.props.fetchFollowing(this.props.currentUser);
  }

  render() {
    const { messages, followers, following, removeMessage, followUser, unFollowUser, currentUser } = this.props;
	let followingMessages = [];
	for (let i = 0; i <= following.length; i++){
		messages.forEach(function(m){
			if (m.user._id === following[i]) {
				followingMessages.push(m);
			}
		});
	}
	let messageList = followingMessages.map(m => (
      <MessageItem
        key={m._id}
        date={m.createdAt}
        text={m.text}
        username={m.user.username}
        profileImageUrl={m.user.profileImageUrl}
        removeMessage={removeMessage.bind(this, m.user._id, m._id)}
        followUser={followUser.bind(this, m.user._id, currentUser)}
		unFollowUser={unFollowUser.bind(this, m.user._id, currentUser)}
        isCorrectUser={currentUser === m.user._id}
        isFollowing={following.includes(m.user._id)}
      />
  ));
  return (
    <div className="row col-sm-8">
      <div className="offset-1 col-sm-10">
        <ul className="list-group" id="messages">
          {messageList}
        </ul>
      </div>
    </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    followers: state.followers,
    following: state.following,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, { fetchMessages, removeMessage, followUser, unFollowUser, fetchFollowers, fetchFollowing })(ProfileMessageList);
