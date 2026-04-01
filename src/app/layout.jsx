import { Rubik, Monoton } from 'next/font/google'

const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
})

const monoton = Monoton({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-monoton',
  display: 'swap',
})

import "@styles/css/plugins/bootstrap.min.css";
import "@styles/css/plugins/swiper.min.css";
import "@styles/css/plugins/font-awesome.min.css";


import '@styles/scss/style.scss';
import "./globals.css";

import ScrollbarProgress from "@layouts/scrollbar-progress/Index";

import AppData from "@data/app.json";

export const metadata = {
  title: {
		default: AppData.settings.siteName,
		template: "%s | " + AppData.settings.siteName,
	},
  description: AppData.settings.siteDescription,
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/img/ui/logo-favicon.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/img/ui/logo-favicon.png",
    },
  ],
}

const Layouts = ({
  children
}) => {
  return (
    <html lang="en" className={`${rubik.variable} ${monoton.variable}`}>
      <body>
        {/* app wrapper */}
        <div className="sb-app">
          {children}

          <ScrollbarProgress />
        </div>
        {/* app wrapper end */}
      </body>
    </html>
  );
};
export default Layouts;
