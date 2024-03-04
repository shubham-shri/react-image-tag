import React, { useState } from "react";
import "./ImageContainer.css";

const ImageContainer = () => {
  const [isAddTagActive, setIsAddTagActive] = useState(false);
  const [addTagCoordinates, setAddTagCoordinates] = useState([0, 0]);
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isAddTagActive) {
      const { pageX, pageY } = e;
      setIsAddTagActive(true);
      setAddTagCoordinates([pageX, pageY]);
    } else {
      setIsAddTagActive(false);
    }
  };
  const handleAddTagSubmit = (e) => {
    e.preventDefault();
    const tagObj = {
      id: Date.now(),
      name: value,
      positionX: addTagCoordinates[0],
      positionY: addTagCoordinates[1],
    };
    setTags((prevTags) => [...prevTags, tagObj]);
    setAddTagCoordinates([0, 0]);
    setValue("");
    setIsAddTagActive(false);
  };
  return (
    <div className="image-container" onClick={handleClick}>
      <img
        className="image"
        src="https://plus.unsplash.com/premium_photo-1681234561215-3b478b9cc1e5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="random-img"
      />
      {tags &&
        tags.map((tag) => {
          const { id, name, positionX, positionY } = tag;
          return (
            <div
              key={id}
              style={{
                top: `${positionY}px`,
                left: `${positionX}px`,
              }}
              className={`image-container__tag`}
            >
              {name}
            </div>
          );
        })}
      <div
        style={{
          top: `${addTagCoordinates[1]}px`,
          left: `${addTagCoordinates[0]}px`,
        }}
        className={`image-container__add-tag-form-container ${
          isAddTagActive ? "visible" : "hidden"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="image-container__add-tag-form"
          onSubmit={handleAddTagSubmit}
        >
          <input
            placeholder="Add name"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button type="submit">Add Tag</button>
        </form>
      </div>
    </div>
  );
};

export default ImageContainer;
