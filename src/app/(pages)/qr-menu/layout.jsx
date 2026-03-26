import Header from "@layouts/headers/Index";

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
