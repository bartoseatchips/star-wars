import { useEffect, useState } from 'react';

import { Input } from 'antd';

export const EditableField: React.FC<{
  value: any;
  onChange: (newValue: any) => void;
}> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    onChange(inputValue);
  };

  return isEditing ? (
    <Input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleSave}
      onPressEnter={handleSave}
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{value}</span>
  );
};
