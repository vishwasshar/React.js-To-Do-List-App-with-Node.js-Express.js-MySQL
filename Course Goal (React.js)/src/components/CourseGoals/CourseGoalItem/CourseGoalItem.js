import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./CourseGoalItem.css";
// import styles from "../../../index.css";

const CourseGoalItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [enteredValue, setEnteredValue] = useState(props.text);

  useEffect(() => {
    if (props.editTaskId === props.id) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [props.editTaskId]);
  const goalInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const updateHandler = () => {
    editMode ? props.editController(false) : props.editController(props.id);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onUpdate(props.id, enteredValue);
    props.editController(false);
  };

  return (
    <div className="goal-card">
      {editMode ? (
        <form className="goal-item" onSubmit={submitHandler}>
          <input
            className="goal-item"
            value={enteredValue}
            onChange={goalInputChangeHandler}
          />
        </form>
      ) : (
        <li className="goal-item">{props.children}</li>
      )}
      <div className="action-bar">
        <AiFillDelete onClick={deleteHandler} className="action-button" />
        <AiFillEdit onClick={updateHandler} className="action-button" />
      </div>
    </div>
  );
};

export default CourseGoalItem;
