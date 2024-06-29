import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';
import { getAllClasses } from '../../services/classService';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClasses();
        setClasses(data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);
  const toggleDropdown = () => setDropdown(!dropdown);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = classes.filter(cls => 
        cls.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses([]);
    }
  };

  const handleCardClick = (classId) => {
    navigate(`/class/${classId}`);
    setSearchQuery('');
    setFilteredClasses([]);
  };

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('token');
  };

  return (
    <div className='header'>
      <nav className='navbar'>
        <Link to='/home' className='logo'>
          <h1>BrightPath</h1>
        </Link>
        <div className='search-container'>
          <form>
            <input
              type='text'
              className='search'
              placeholder='Search Class'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
          {filteredClasses.length > 0 && (
            <div className='search-results'>
              {filteredClasses.map(cls => (
                <div
                  key={cls.class_id}
                  className='search-result-item'
                  onClick={() => handleCardClick(cls.class_id)}
                >
                  <p>{cls.class_type}</p>
                  <h4>{cls.title}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/home' onClick={closeMenu}>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to='/about' onClick={closeMenu}>About Us</Link>
          </li>
          <li className='nav-item'>
            <Link to='/class' onClick={closeMenu}>Classes</Link>
          </li>
          <li className='nav-item'>
            <Link to='/joinedclass' onClick={closeMenu}>Joined</Link>
          </li>
          <li className='nav-item' onClick={toggleDropdown}>
            <img src='/assets/account.png' alt='' className='nav-account'/>
            {dropdown && (
              <div className='dropdown-menu'>
                <Link to='/profile' className='dropdown-item' onClick={closeMenu}>Profile</Link>
                <Link to='/' className='dropdown-item' onClick={handleLogout}>Logout</Link>
              </div>
            )}
          </li>
        </ul>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
