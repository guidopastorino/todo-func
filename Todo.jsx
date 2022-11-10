import React, {useState, useEffect, useRef} from 'react'

const ToDo = () => {

    const inputRef = useRef()
    
    const getItems = () => {
        const tasksList = JSON.parse(localStorage.getItem('tasks'))
        console.log(tasksList)

        if(tasksList){
            return tasksList
        } else {
            return []
        }
    }

    const [tasks, setTasks] = useState(getItems())

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        console.log(tasks)

    }, [tasks])



    const addTask = () => {
        if(inputRef.current.value === '') return false

        setTasks([
            ...tasks,
            inputRef.current.value
        ])

        inputRef.current.value = ''
    }

    const clearList = () => {
        setTasks([])
        localStorage.clear()
    }


  return (
    <>
        <form onSubmit={(e) => e.preventDefault()}>
            <input ref={inputRef} type="text" placeholder='Task' />
            <button onClick={addTask}>Add Task</button>
        </form>
        <button onClick={clearList}>Clear List</button>
        {
            tasks.map((task, i) => (
                // <li key={i}>{task}</li>
                <li key={i}>
                    {task}
                    <button onClick={(e) => tasks.splice(i, 1)}>Remove</button>
                </li>
            ))
        }
    </>
  )
}

export default ToDo
