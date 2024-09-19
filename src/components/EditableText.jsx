import { useState } from 'react';

function EditableText({ text, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleSave = () => {
    setIsEditing(false);
    onSave(value);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{text}</span>
      )}
    </div>
  );
}

export default EditableText;
