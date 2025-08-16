import { useEffect, useState } from 'react';
import axios from 'axios';

import { TodoListPage } from './Pages/TodoPage/TodoListPage'
import { HomePage } from './Pages/HomePage/HomePage'
import { Routes, Route } from 'react-router-dom'
import { NavbarComp } from './Components/NavbarComponent'
import { NotFoundPage } from './Pages/NotFound/NotFoundPage'
import { AboutPage } from './Pages/AboutPage/AboutPage'
import { FooterComp } from './Components/FooterComponent'
import { LoginPage } from './Pages/LoginPage/LoginPage'
import { RegisterPage } from './Pages/RegistrationPage/RegisterPage'
import { NewsDetailsPage } from './Pages/HomePage/NewsDetailsPage';
import { RecipePage } from './Pages/RecipePage/RecipePage';
import { CreateRecipePage } from './Pages/RecipePage/CreateRecipe';


export default function App() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    axios.get('http:localhost:5000/api/message') // proxied to backend
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error(err));
  }, []);

  return (<>
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <NavbarComp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news/:newsId" element={<NewsDetailsPage />} />
          <Route path="/todoList" element={<TodoListPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="recipe" element={<RecipePage />} />
          <Route path="/recipe/create" element = {<CreateRecipePage/>} />
        </Routes>
      </main>
      <FooterComp />
    </div>
  </>
  )
}