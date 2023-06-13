import React, { useState } from "react";

import CourseGoalItem from "../CourseGoalItem/CourseGoalItem";
import "./CourseGoalList.css";

const CourseGoalList = (props) => {
  const [editTaskId, setEditTaskId] = useState(false);

  return (
    <ul className="goal-list">
      {props.items.map((goal) => (
        <CourseGoalItem
          key={goal.id}
          id={goal.id}
          text={goal.text}
          onDelete={props.onDeleteItem}
          onUpdate={props.onUpdateItem}
          editTaskId={editTaskId}
          editController={setEditTaskId}
        >
          {goal.text}
        </CourseGoalItem>
      ))}
    </ul>
  );
};

export default CourseGoalList;
