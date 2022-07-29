function TopBar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">

        <div className="topbar-divider d-none d-sm-block"></div>

        {/* <!-- Nav Item - User Information --> */}
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="/" id="userDropdown">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              Admin
            </span>
            
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default TopBar;
