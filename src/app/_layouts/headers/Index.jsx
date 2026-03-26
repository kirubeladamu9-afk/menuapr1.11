import HeaderLayoutDefault from "./LayoutDefault";
import HeaderLayoutQrMenu from "./LayoutQrMenu";

const Header = ({ layout }) => {
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
