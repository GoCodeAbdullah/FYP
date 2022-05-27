import React from "react";
import { NavLink } from "react-router-dom";

const SideMenuGym = () => {
  return (
    <div className="sidebar">
      <div className="logo-content">
        <div className="logo">
          <i class="bx bx-dumbbell"></i>
          <div className="logo-name">Fit</div>
        </div>{" "}
      </div>
      <ul className="nav_list">
        <li>
          <NavLink to="/gym-dashboard" activeClassName="active">
            <i class="bx bxs-home-circle">
              <span className="links_name">Home</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/query" activeClassName="active">
            <i class="bx bx-question-mark">
              <span className="links_name">Query</span>
            </i>
          </NavLink>
        </li>
      </ul>

      <div className="profile_content">
        <div className="profile">
          <div className="profile-details">
            <div className="name_job">
              <div className="name"></div>
              <div className="job"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenuGym;
