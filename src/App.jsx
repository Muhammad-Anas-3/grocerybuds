import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import List from "./Components/List";
import Alert from "./Components/Alert";

const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, "danger", "Please enter a value");
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "Successfully edited");
    } else {
      // show alert
      showAlert(true, "success", "item added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "Grocery items have been removed");
    setList([]);
  };

  const removeOneItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  });

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        <div className="alert-container">
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
        </div>
        <h2 className="title">Grocery items</h2>
        <div className="form-control">
          <input
            type="text"
            className="grocery-input"
            placeholder="e.g eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "Edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <>
          <div className="grocery-container">
            <List
              items={list}
              removeOneItem={removeOneItem}
              editItem={editItem}
            />
          </div>
          <button className="clear-items" onClick={clearList}>
            Clear items
          </button>
        </>
      )}
    </section>
  );
}

export default App;
