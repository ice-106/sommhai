import React, { useEffect, useState } from 'react';

interface MessageFormProps {
  message: string;
  onSave: (message: string) => void;
}

function MessageForm({ message, onSave }: MessageFormProps) {
  const [editedMessage, setEditedMessage] = useState(message);

  useEffect(() => {
    setEditedMessage(message);
  }, [message]);

  const handleSave = () => {
    onSave(editedMessage);
  };

  return (
    <div className='bg-orange-3 text-bold-24 mx-12 flex min-h-[188px] w-full flex-col items-center justify-center gap-4 overflow-y-auto rounded-[25px] p-4 px-24'>
      <label className='text-white-bg text-3xl font-bold'>Post a Message</label>
      <textarea
        className='h-full w-full rounded border p-2'
        placeholder='Event Message'
        value={editedMessage}
        onChange={(e) => setEditedMessage(e.target.value)}
      />
      <button
        className='bg-orange-2 hover:bg-orange-2 mx-4 mb-8 mt-4 rounded px-4 py-2 text-white'
        onClick={handleSave}
      >
        Save Message
      </button>
    </div>
  );
}

export default MessageForm;
