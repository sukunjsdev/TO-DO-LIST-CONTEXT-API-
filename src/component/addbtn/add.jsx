import "./add.css";
import { useContext } from "react";
import { Contextapi } from "../../context/context";
export const AddBtn = () => {
  const {
    task,
    handleInput,
    handleApply,
    handleCloseAddBtn,
    editingTaskId,
  } =
    useContext(Contextapi);
  return (
    <div className="modal-overlay">
      <div className="add">
        <div className="top-add">
          <h1 className="heading-add">
            {editingTaskId === null ? "NEW NOTE" : "EDIT NOTE"}
          </h1>
          <input
            className="input-add"
            type="text"
            placeholder="Input your note..."
            value={task}
            onChange={handleInput}
          />
        </div>
        <div className="bottom-add">
          <button
            onClick={handleCloseAddBtn}
            className="btn-cancel"
          >
            CANCEL
          </button>
          <button className="btn-apply" onClick={handleApply}>
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};
