import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleNameChange(changedName) {
    setName(changedName);
  }

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing);
    if (isEditing) onChangeName(symbol, name);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      {!isEditing ? (
        <span className="player-name">{name}</span>
      ) : (
        <input
          type="text"
          className="player input"
          value={name}
          required
          onChange={(e) => handleNameChange(e.target.value)}
        />
      )}
      <span className="player-symbol">{symbol}</span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
