import React from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

export default (props) => {
  const logout = () =>{
	app.logout().then(() => window.location.href = '/index.html');
  }
  const users = props.users ||[];

  return (
	<aside className="sidebar col col-3 flex flex-column flex-space-between">
	  <header className="flex flex-row text-center">
		<h4 className="font-300 text-left">
		  <span className="font-600 online-count">{users.length}</span> users
		</h4>
	  </header>
	  <List>
	  {users.map((user,index,list) =>
			<ListItem key={index}
				disabled={true}
				leftAvatar={ <Avatar src={user.avatar || PLACEHOLDER} /> } >
				{user.email}
			</ListItem>
	   )}

	  </List>
	  <footer className="flex flex-row flex-center">
		<a href="#" className="logout button button-primary" onClick={logout}>
		  Sign Out
		</a>
	  </footer>
	</aside>
	)
}