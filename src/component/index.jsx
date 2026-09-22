import searchlight from "../assets/searchlight.svg";
import moon from "../assets/moontheme.svg";
import editbtn from "../assets/edit.svg";
import deletebtn from "../assets/delete.svg";
import addbtn from "../assets/addbtn.svg";
import sun from "../assets/suntheme.svg";
import searchdark from "../assets/searchdark.svg";
import { useContext, useState } from "react";
import "./todo.css";
import { Contextapi } from "../context/context";
import { AddBtn } from "./addbtn/add";
export const Index = () => {
  const {
    darkMode,
    toggleTheme,
    showAddBtn,
    setShowAddBtn,
    tasks,
    handleToggleTask,
    handleDeleteTask,
    handleEditTask,
  } = useContext(Contextapi);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");
  const visibleTasks = tasks.filter((item) => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "complete" && item.completed) ||
      (filter === "incomplete" && !item.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="header">
        <h1>TODO LIST</h1>
        <div className="top-header-btns">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search note..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <img
              className="search-btn"
              src={darkMode ? searchdark : searchlight}
              alt=""
            />
          </div>
          <div className="top-btns">
            <select
              className="select-btn"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option value="all">ALL</option>
              <option value="complete">COMPLETE</option>
              <option value="incomplete">INCOMPLETE</option>
            </select>
            <img
              className="moonbtn"
              src={darkMode ? sun : moon}
              alt="searchmirror-img"
              onClick={toggleTheme}
            />
          </div>
        </div>
      </div>
      <div className="main">
        <ul className="unorder-list">
          {visibleTasks.map((item) => (
            <li className="list" key={item.id}>
              <span className="left-side">
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}`}
                  checked={item.completed}
                  onChange={() => handleToggleTask(item.id)}
                />
                <label htmlFor={`checkbox-${item.id}`}>{item.text}</label>
              </span>
              <span className="right-side">
                <img
                  src={editbtn}
                  alt="Edit note"
                  onClick={() => handleEditTask(item)}
                />
                <img
                  src={deletebtn}
                  alt="Delete note"
                  onClick={() => handleDeleteTask(item.id)}
                />
              </span>
            </li>
          ))}
        </ul>
        <img
          className="addbtn"
          onClick={() => setShowAddBtn(true)}
          src={addbtn}
          alt=""
        />
      </div>
      {showAddBtn && <AddBtn />}
    </>
  );
};
