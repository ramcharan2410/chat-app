const Bubble = (props) => {
  const { data, left } = props
  const { message_content, time } = data
  const now = new Date(time)
  const hours = now.getHours()
  const minutes = now.getMinutes()

  return (
    <li
      className="bubble"
      style={{
        justifyContent: left ? 'flex-start' : 'flex-end',
      }}
    >
      <p className="message-content">
        {message_content}{' '}
        <span className="message-time">
          {now.getDate()}/{now.getMonth()} - {hours}:{minutes}
        </span>
      </p>
    </li>
  )
}

export default Bubble
