//import 'bootstrap'
import { TodoListComponent } from './Pages/TodoPage/TodoListComponent'
import { HomePage } from './Pages/HomePage/HomePage'
import { Routes, Route } from 'react-router-dom'
import { NavbarComponent } from './Components/NavbarComponent'
import { NotFound } from './Pages/NotFound/NotFound'



export default function App() {
  return (<>
  <NavbarComponent/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todoList" element={<TodoListComponent />} />
        <Route path ="*" element = {<NotFound/>} />
      </Routes>
  </>
  )
}