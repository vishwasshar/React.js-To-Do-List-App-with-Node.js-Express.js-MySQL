import React, { useState, useEffect } from "react";
import CourseGoalList from "./components/CourseGoals/CourseGoalList/CourseGoalList";
import CourseInput from "./components/CourseGoals/CourseInput/CourseInput";
import "./App.css";

const App = () => {
  const [courseGoals, setCourseGoals] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCourseGoals(
          data.taskList.map((task) => {
            return { text: task.Task, id: task.id };
          })
        );
      });
  }, []);

  const addGoalHandler = (enteredText) => {
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Task: enteredText, authKey: "vishwas" }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCourseGoals((prevGoals) => {
          const updatedGoals = [...prevGoals];
          updatedGoals.push({
            text: enteredText,
            id: Math.random().toString(),
          });
          return updatedGoals;
        });
      })
      .catch((err) => {
        console.log("Err");
      });
  };

  // updateHandler(1, "HELLO WORLD");
  const deleteItemHandler = (goalId) => {
    fetch("http://localhost:3001/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deleteID: goalId, authKey: "vishwas" }),
    }).then((res) => {
      setCourseGoals((prevGoals) => {
        const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
        return updatedGoals;
      });
    });
  };

  const updateHandler = (goalId, enteredText) => {
    fetch("http://localhost:3001/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateID: goalId,
        updateText: enteredText,
        authKey: "vishwas",
      }),
    })
      .then((res) => {
        setCourseGoals((prevGoals) => {
          const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
          updatedGoals.push({ text: enteredText, id: goalId });
          return updatedGoals;
        });
        return res.json();
      })
      .then((res) => {});
  };

  let content = (
    <p style={{ textAlign: "center" }}>No goals found. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList
        items={courseGoals}
        onDeleteItem={deleteItemHandler}
        onUpdateItem={updateHandler}
      />
    );
  }

  return (
    <div>
      <section id="goal-form">
        <CourseInput onAddGoal={addGoalHandler} />
      </section>
      <section id="goals">{content}</section>
    </div>
  );
};

export default App;
