import { Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'
import Login from './pages/login'
import Navbar from './components/Navbar'
import 'reactjs-popup/dist/index.css';
import Register from './pages/register';
import MyCabinet from './pages/MyCabinet';
import { SupportChat } from './pages/SupportChat';
import AuthorCabinet from './pages/AuthorCabinet';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import PreviewBook from './pages/PreviewBook';
import Home from './pages/Home';
import { useState } from 'react';
import Favorite from './pages/Favorite';
import { Basket } from './pages/Basket';
import { MyPurchases } from './pages/MyPurchases';
import { useGetAllBooksQuery } from './app/services/book';
import { setSearchBooks } from './features/mainSearch/mainSearchSlice';
import { useDispatch } from 'react-redux';

const App = () => {
  const [search, setSearch] = useState<string>("");

  const bookList = useGetAllBooksQuery();
  const dispatch = useDispatch();

  const onClickSearchButton = () => {
    if(search !== "") {
      dispatch(setSearchBooks(bookList.data?.filter(el => el.bookName.toLowerCase().includes(search.toLowerCase()))))
    }
  }

  return (
    <>
      <Navbar search={search} setSearch={setSearch} onClick={onClickSearchButton} />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/mycab' element={<MyCabinet />} />
          <Route path='/support' element={<SupportChat />} />
          <Route path={`/author_cabinet/:id`} element={<AuthorCabinet />} />
          <Route path='/addbook' element={<AddBook />} />
          <Route path='/edit/:bookId' element={<EditBook />} />
          <Route path='/previewBook/:bookId' element={<PreviewBook />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/basket' element={<Basket />} />
          <Route path='/mypurchases' element={<MyPurchases />} />
          <Route path='*' element={<Navigate to={"/"} />} />
        </Routes>
      </div>
    </>

  )
}

export default App