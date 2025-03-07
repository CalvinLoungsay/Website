import { useState, useEffect } from 'react'
import { TodoComp } from "./Todo"
import { NewTodoForm } from './NewTodoForm'
import { Container, Row, Col, ListGroup } from "react-bootstrap"
import "../../CSS/TodoList.css"

interface Todo {
  id: number
  title: String
  completed: boolean
}

export function TodoListComponent() {

  const [count, setCount] = useState<number>(() => {
    const localValue = localStorage.getItem("COUNT")
    if (localValue == null) return 1

    return JSON.parse(localValue)
  })
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
    localStorage.setItem("COUNT", JSON.stringify(count))
  }, [todos])

  function addTodo(title: String) {
    let item: Todo = { id: count, title: title, completed: false }
    setCount(prev => prev + 1)
    setTodos((currentTodos) => {
      return [...currentTodos, item]
    })
  }

  function toggleCheck(id: number, completed: boolean) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id: number) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (<>
    <Container className="todoContainer">
      <Row className="mx-5">
        <Col className="d-flex justify-content-center">
          <h1 className="todoHeader">Todo Creation</h1>
        </Col>
      </Row>
      <NewTodoForm addTodo={addTodo} />
      <Row className="mx-5">
        <Col className="d-flex justify-content-center">
          <h1 className="listHeader">Todo List</h1>
        </Col>
      </Row>
      <Row>
        {todos.length === 0 && <h1 className="d-flex justify-content-center my-4">No Todos</h1>}
      </Row>

      <ListGroup as ="ul" className = "todoList gap-2">
      {
        todos.map(todo => {
          return <TodoComp todo={todo} todoList={todos} toggleCheck={toggleCheck} deleteTodo={deleteTodo} key={todo.id}></TodoComp>;
        })
      }
    </ListGroup>
    </Container>
  </>
  )
}