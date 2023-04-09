import './App.css';
import { Link, BrowserRouter, Outlet, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Display from './Display';
import Create from './Create';
import Post from './Post';
import Edit from './Edit';


function App() {
  //set value for the search bar
  const [search, setSearch] = useState('')

  //event handler for the search input and display posts regarfing this search
  const handleSearch =(e)=>{
    e.preventDefault()
    setSearch(e.target.value)

    //write lines to sort methods

  }

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>DanceHub</h1>
          <form>
              <input type='text' className='searchbar' value={search} placeholder='Search' onChange={handleSearch}/>
          </form>
          <ul className='navbar'>
            <li><Link to='/'><a>Home</a></Link></li>
            <li><Link to='/create'><a>Create New Post</a></Link></li>
          </ul>
        </header>

        <Outlet/>

      </div>

      <Routes>
        <Route path='/' element={<Display search={search}/>}/>
        <Route path='/posts/:id' element={<Post/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
