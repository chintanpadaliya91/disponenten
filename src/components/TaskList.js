import React from 'react'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'

const TaskListTableHead = () => {
  return (
    <thead>
      <tr>
        <th>Auftrag</th>
        <th>im KV/VB</th>
        <th>erteilt</th>
        <th>erledigt</th>
      </tr>
    </thead>
  )
}

const TaskListTableBody = (props) => {
  const {tasks} = props

  return (
    <tbody>
      {Object.values(tasks.docs).map((task, index) => {
        return <tr key={index} >
          <td>{task.label}</td>
          <td>
            <Checkbox
              disabled={!task.in_contract}
              checked={task.in_contract} />
          </td>
          <td>
            <Checkbox
              checked={task.ordered}
              onChange={(ordered) => props.orderTask(task.task_id, ordered)}
            />
          </td>
          <td>
            <Checkbox
              checked={task.completed}
              disabled={!task.ordered}
              onChange={(completed) => props.saveTask(task.task_id, completed)}
            />
          </td>
        </tr>
      })}
    </tbody>
  )
}

const TaskList = (props) => {
  const isFetching = props.tasks.isFetching
  const errorMessage = props.tasks.error
  const {allContractPerqsOrdered, allTasksCompleted} = props

  let statusClassName = ''
  if (allContractPerqsOrdered === false) {
    statusClassName = 'status-red'
  }
  else if (allTasksCompleted === false) {
    statusClassName = 'status-orange'
  }
  else {
    statusClassName = 'status-green'
  }

  if (isFetching) {
    return (
      <div className='component status-red'>
        <h4 className='component-heading'>Aufträge</h4>
        <div className='component-body'>
          <div>Aufträge werden geladen...</div>
        </div>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className='component status-red'>
        <h4 className='component-heading'>Aufträge</h4>
        <div className='component-body'>
          <div className='error-message'>Fehler beim Laden: {errorMessage}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={'component ' + statusClassName}>
      <h4 className='component-heading'>Aufträge</h4>
      <div className='component-body'>
        <table id='task-list'>
          <TaskListTableHead />
          <TaskListTableBody {...props} />
        </table>
      </div>
    </div>
  )
}

export default TaskList
