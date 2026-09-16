import { useState, useEffect } from "react";
import { Contextapi } from "./context";

export const ContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showAddBtn, setShowAddBtn] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };
  const handleInput = (e) => {
    setTask(e.target.value);
  };
  const handleApply = () => {
    const newTask = task.trim();
    if (!newTask) {
      return;
    }
    if (editingTaskId !== null) {
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === editingTaskId
            ? { ...currentTask, text: newTask }
            : currentTask,
        ),
      );
      setEditingTaskId(null);
    } else {
      setTasks((currentTasks) => [
        ...currentTasks,
        { id: crypto.randomUUID(), text: newTask, completed: false },
      ]);
    }
    setTask("");
    setShowAddBtn(false);
  };

  const handleToggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === taskId
          ? { ...currentTask, completed: !currentTask.completed }
          : currentTask,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((currentTask) => currentTask.id !== taskId),
    );
  };

  const handleEditTask = (taskToEdit) => {
    setTask(taskToEdit.text);
    setEditingTaskId(taskToEdit.id);
    setShowAddBtn(true);
  };

  const handleCloseAddBtn = () => {
    setTask("");
    setEditingTaskId(null);
    setShowAddBtn(false);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    <Contextapi.Provider
      value={{
        darkMode,
        toggleTheme,
        setShowAddBtn,
        showAddBtn,
        task,
        tasks,
        handleInput,
        handleApply,
        handleToggleTask,
        handleDeleteTask,
        handleEditTask,
        handleCloseAddBtn,
        editingTaskId,
      }}
    >
      {children}
    </Contextapi.Provider>
  );
};
