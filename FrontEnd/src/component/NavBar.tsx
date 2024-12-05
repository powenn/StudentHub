import { Link } from 'react-router-dom';
import '../style/App.css';
import '../style/NavBar.css'

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <Link to="/">學生列表</Link>
      <Link to="/insertOne">新增學生</Link>
    </nav>
  );
}

