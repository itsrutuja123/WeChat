import './style.css';

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  
	const isFileMessage = message.message.includes("shared: ");
	const fileUrl = isFileMessage ? message.message.split("shared: ")[1] : null;
  
	return (
	  <div className={`chat ${chatClassName}`}>
		<div className="chat-image avatar">
		  <div className="w-10 rounded-full">
			<img alt="Profile" src={profilePic} />
		  </div>
		</div>
		<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
		  {isFileMessage ? (
			<a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
			  {fileUrl}
			</a>
		  ) : (
			message.message
		  )}
		</div>
		<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
		  {formattedTime}
		</div>
	  </div>
	);
  };
  
  export default Message;
  