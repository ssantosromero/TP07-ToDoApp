import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;

    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));

    setNewTask("");
  };

  const toggleTask = (id) => {
    fetch(`/api/tasks/${id}/toggle`, { method: "PUT" })
      .then((res) => res.json())
      .then((updated) =>
        setTasks(tasks.map((t) => (t.id === id ? updated : t)))
      );
  };

  return (
    <div className="page">
      <h1 className="title">📝 ToDoApp – TP07</h1>

      <div className="add-box">
        <input
          placeholder="Nueva tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Agregar</button>
      </div>

      <div className="task-grid">
        {tasks.map((t) => (
          <div className="task-card" key={t.id}>
            <div className="header">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(t.id)}
              />
              <span className={t.done ? "done" : ""}>{t.title}</span>
            </div>

            <p className="status">
              {t.done ? "✔ Completada" : "⏳ Pendiente"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
