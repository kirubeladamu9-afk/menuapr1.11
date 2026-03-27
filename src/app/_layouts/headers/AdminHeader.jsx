"use client";

import Link from "next/link";
import AppData from "@data/app.json";

const AdminHeader = () => {
  return (
    <div className="admin-top-bar-frame">
      <div className="admin-top-bar-bg"></div>
      <div className="container">
        <div className="admin-top-bar">
          <Link href="/admin" className="admin-logo-frame">
            <img src={AppData.header.logo.image} alt={AppData.header.logo.alt} />
            <span className="admin-brand-text">Admin Panel</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
