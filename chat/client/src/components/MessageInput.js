function MessageInput({ onSend }) {
  const handleKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      onSend(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div className="box">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Say something..."
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default MessageInput;
