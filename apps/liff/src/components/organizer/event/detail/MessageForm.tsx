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
    <div className='bg-orange-3 text-bold-24 flex min-h-[188px] w-[302px] flex-col items-center justify-center gap-4 overflow-y-auto rounded-[25px] p-4'>
      <textarea
        className='h-32 w-full rounded border p-2'
        placeholder='Event Message'
        value={editedMessage}
        onChange={(e) => setEditedMessage(e.target.value)}
      />
      <button className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600' onClick={handleSave}>
        Save Message
      </button>
    </div>
  );
}

export default MessageForm;
