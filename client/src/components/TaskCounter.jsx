function TaskCounter({
  totalCount,
  completedCount,
  filteredCount,
  currentFilter,
  onChangeFilter,
}) {
  // text to show based on filter
  let counterText = ''

  if (currentFilter === 'all') {
    counterText = `${totalCount} total tasks`
  } else if (currentFilter === 'active') {
    counterText = `${filteredCount} active of ${totalCount}`
  } else if (currentFilter === 'completed') {
    counterText = `${filteredCount} completed of ${totalCount}`
  }

  return (
    <div className="task-counter">
      <p>{counterText}</p>
      <div className="filter-buttons">
        <button
          type="button"
          className={currentFilter === 'all' ? 'active' : ''}
          onClick={() => onChangeFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={currentFilter === 'active' ? 'active' : ''}
          onClick={() => onChangeFilter('active')}
        >
          Active
        </button>
        <button
          type="button"
          className={currentFilter === 'completed' ? 'active' : ''}
          onClick={() => onChangeFilter('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  )
}

export default TaskCounter
