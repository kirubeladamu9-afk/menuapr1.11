import Header from "@layouts/headers/Index";
import AppData from "@data/app.json";

export const metadata = {
  title: "Menu - QR Code",
  description: AppData.settings.siteDescription,
};

const QrMenuLayout = ({ children }) => {
  return (
    <>
      <Header layout="qr-menu" />

      <div id="sb-dynamic-content" className="sb-transition-fade qr-menu-page">
        {children}
      </div>
    </>
  );
};

export default QrMenuLayout;
