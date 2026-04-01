"use client";

import Link from "next/link";
import AppData from "@data/app.json";
import { usePathname } from 'next/navigation';
import { useLanguage } from "@common/LanguageContext";

const DefaultFooter = () => {
  const { t } = useLanguage();
  const asPath = usePathname();

  return (
    <>
        {/* footer */}
        <footer>
            <div className="container">
                <div className="sb-footer-frame">
                    <Link href="/" className="sb-logo-frame">
                        {/* logo img */}
                        <img src={AppData.header.logo.image} alt={AppData.header.logo.alt} />
                    </Link>
                    <ul className="sb-social">
                        {AppData.social.map((item, key) => (
                        <li key={`footer-social-item-${key}`}><a href={item.link} target="_blank" title={item.title}><i className={item.icon}></i></a></li>
                        ))}
                    </ul>
                    <div className="sb-copy">{t('footer.copyright')}</div>
                </div>
            </div>
        </footer>
        {/* footer end */}
    </>
  );
};
export default DefaultFooter;
