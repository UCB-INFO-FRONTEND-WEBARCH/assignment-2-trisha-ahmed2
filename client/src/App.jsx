import { useState } from 'react'
import TaskForm from './components/TaskForm.jsx'
import TaskCounter from './components/TaskCounter.jsx'
import TaskList from './components/TaskList.jsx'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  function addTask(text) {
    const trimmed = text.trim()
    if (trimmed === '') return

    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    }
    setTasks((prev) => [...prev, newTask])
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  // filtering
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true // all
  })

  const totalCount = tasks.length
  const completedCount = tasks.filter((t) => t.completed).length
  const filteredCount = filteredTasks.length

  return (
    <div>
      {/* HEADER */}
      <header>
        <div className="header-nav-container">
          {/* menu icon */}
          <img
            src="./src/assets/menu_icon.png"
            alt="menu"
            style={{ width: '20px', height: '20px' }}
          />
          {/* search box */}
          <input
            type="text"
            className="search-input"
            placeholder="Search"
          />
        </div>

        <div className="header-end-item">
          {/* check icon */}
          <img
            src="./src/assets/check_icon.png"
            alt="check"
            style={{ width: '20px', height: '20px' }}
          />
          <span>{completedCount} done</span>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="page-contents">
        {/* LEFT NAV */}
        <nav>
          <ul>
            <li>
              <article>
                <img
                    src="./src/assets/inbox_icon.png"
                    alt="inbox"
                    style={{ width: '14px', height: '14px' }}
                />
                <span>Inbox</span>
              </article>
              <span className="task-count">{totalCount}</span>
            </li>
            <li>
              <article>
                <img
                    src="./src/assets/upcoming_icon.png"
                    alt="upcoming"
                    style={{ width: '14px', height: '14px' }}
                />
                <span>Active</span>
              </article>
              <span className="task-count">
                {tasks.filter((t) => !t.completed).length}
              </span>
            </li>
            <li>
              <article>
                <img
                    src="./src/assets/calendar_icon.png"
                    alt="calendar"
                    style={{ width: '14px', height: '14px' }}
                />
                <span>Completed</span>
              </article>
              <span className="task-count">
                {tasks.filter((t) => t.completed).length}
              </span>
            </li>
          </ul>
        </nav>

        {/* MAIN CONTENT */}
        <main>
          <h1>Tasks</h1>

          {/* add form */}
          <TaskForm onAddTask={addTask} />

          {/* counter + filter buttons */}
          <TaskCounter
            totalCount={totalCount}
            completedCount={completedCount}
            filteredCount={filteredCount}
            currentFilter={filter}
            onChangeFilter={setFilter}
          />

          {/* list */}
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </main>
      </div>
    </div>
  )
}

export default App
