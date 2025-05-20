import { TodoListPage } from './Pages/TodoPage/TodoListPage'
import { HomePage } from './Pages/HomePage/HomePage'
import { Routes, Route } from 'react-router-dom'
import { NavbarComponent } from './Components/NavbarComponent'
import { NotFoundPage } from './Pages/NotFound/NotFoundPage'
import { AboutPage } from './Pages/AboutPage/AboutPage'



export default function App() {
  return (<>
    <NavbarComponent />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todoList" element={<TodoListPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
  )
}