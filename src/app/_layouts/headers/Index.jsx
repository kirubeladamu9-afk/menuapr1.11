"use client";

import { usePathname } from 'next/navigation';
import HeaderLayoutDefault from "./LayoutDefault";
import HeaderLayoutQrMenu from "./LayoutQrMenu";
import AdminHeader from "./AdminHeader";

const Header = ({ layout }) => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return <AdminHeader />;
  }

  switch (layout) {
    case 1:
      return;

    case 2:
      return;

    case "qr-menu":
      return <HeaderLayoutQrMenu />;

    default:
      return (
        <HeaderLayoutDefault />
      );
  }
};
export default Header;
