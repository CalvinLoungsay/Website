import { TodoListPage } from './Pages/TodoPage/TodoListPage'
import { HomePage } from './Pages/HomePage/HomePage'
import { Routes, Route } from 'react-router-dom'
import { NavbarComp } from './Components/NavbarComponent'
import { NotFoundPage } from './Pages/NotFound/NotFoundPage'
import { AboutPage } from './Pages/AboutPage/AboutPage'
import { FooterComp } from './Components/FooterComponent'



export default function App() {
  return (<>
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <NavbarComp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todoList" element={<TodoListPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <FooterComp />
    </div>
  </>
  )
}