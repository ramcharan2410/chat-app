import './usersfriends.css'
const UsersFriends = (props) => {
  const { picture, name, socket_id, email } = props.data
  const { selectedUserChanger, fetchChat } = props

  return (
    <li
      style={{
        listStyle: 'none',
      }}
    >
      <button
        onClick={() => {
          fetchChat(email)
          selectedUserChanger(props.data)
        }}
        className="userfriend"
      >
        <img
          src={picture}
          alt="profile pic"
          className="profile-pic-friend"
          style={{ outlineColor: socket_id === null ? 'red' : 'green' }}
        />
        <h2
          style={{
            marginLeft: '1vw',
          }}
        >
          {name}
        </h2>
      </button>
    </li>
  )
}

export default UsersFriends
