import SearchContact from "./contact/SearchContact";
import { ORANGE, CORAL, SILVER } from "../helpers/color";
import { useLocation } from "react-router";
const Navbar = () => {
  const location = useLocation();
  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: CORAL }}
    >
      <div className="container">
        <div className="row w-100 my-3">
          <div className="col">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: ORANGE }} />{" "}
              <span style={{ color: SILVER }}>مدیریت اپلیکیشن وب</span>{" "}
              <span style={{ color: ORANGE }}>مخاطبین</span>
            </div>
          </div>
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SearchContact/>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
