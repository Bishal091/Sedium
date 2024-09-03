import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import Blog from './pages/Blog'
import Error from './pages/Error'
import { Blogs } from "./pages/Blogs";
import Publish from './pages/Publish';
import { AuthProvider } from './hooks/aaaa';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Logout from './pages/Logout';
import MyBlogs from './pages/MyBlogs'

function App() {

  return (
    <>
      <BrowserRouter>
      {/* <Appbar/> */}
      <Navbar/>
      
        <Routes>
          
          
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/contact" element={<Contact/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path='*' element={<Error  message="Something went wrong!"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App