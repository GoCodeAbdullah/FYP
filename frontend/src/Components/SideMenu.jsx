import React from "react";

const SideMenu = () => {
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
          <a href="">
            <i class="bx bx-grid-alt">
              <span className="links_name">Dashbaord</span>
            </i>
          </a>
          <span className="tooltip">Dashbaord</span>
        </li>
        <li>
          <a href="">
            <i class="bx bx-search">
              <span className="links_name">Search Gym</span>
            </i>
          </a>
          <span className="tooltip">Search Gym</span>
        </li>
        <li>
          <a href="">
            <i class="bx bx-search-alt">
              <span className="links_name">Search Trainer</span>
            </i>
          </a>
          <span className="tooltip">Search Trainer</span>
        </li>
        <li>
          <a href="">
            <i class="bx bx-history">
              <span className="links_name">History</span>
            </i>
          </a>
          <span className="tooltip">History</span>
        </li>
        <li>
          <a href="">
            <i class="bx bx-run">
              <span className="links_name">Activity Plans</span>
            </i>
          </a>
          <span className="tooltip">Activity Plans</span>
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

export default SideMenu;
