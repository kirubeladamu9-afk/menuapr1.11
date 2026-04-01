'use client';

import AppData from "@data/app.json";
import AboutData from "@data/sections/about-2.json";
import { useLanguage } from "@common/LanguageContext";

const MiniSidebar = () => {
    const { t } = useLanguage();
    const aboutParagraph = AboutData.description.match(/<p>.*?<\/p>/)?.[0] || AboutData.description;

    return (
        <>
            <div className="sb-infobar-content">
                <div className="sb-ib-title-frame sb-mb-30">
                    <h4>{t('contact.title')}</h4><i className="fas fa-arrow-down"></i>
                </div>
                <ul className="sb-list sb-mb-30">
                    <li><b>{t('contact.address')}:</b><span>{t('contact.addressValue')}</span></li>
                    <li><b>{t('contact.workingHours')}:</b><span>{t('contact.workingHoursValue')}</span></li>
                    <li><b>{t('contact.phone')}:</b><span>{t('contact.phoneValue')}</span></li>
                    <li><b>{t('contact.email')}:</b><span>{t('contact.emailValue')}</span></li>
                </ul>
                <div className="sb-ib-title-frame sb-mb-30">
                    <h4>Instagram</h4><i className="fas fa-arrow-down"></i>
                </div>
                <ul className="sb-instagram sb-mb-30">
                    {AppData.instagram.map((item, key) => (
                    <li key={`mini-sidebar-inst-item-${key}`}><a href={item.link} target="_blank"><img src={item.image} alt={item.title} /></a></li>
                    ))}
                </ul>
                <hr />
                <div className="sb-ib-title-frame sb-mb-30">
                    <h4>About Us</h4><i className="fas fa-arrow-down"></i>
                </div>
                <div className="sb-infobar-about sb-mb-30">
                    <div className="sb-infobar-about-visual sb-mb-20">
                        <img src={AboutData.image.url} alt={AboutData.image.alt} />
                    </div>
                    <div className="sb-infobar-about-copy">
                        <div className="sb-text sb-text-sm" dangerouslySetInnerHTML={{ __html: aboutParagraph }} />
                    </div>
                </div>
            </div>
            <div className="sb-info-bar-footer">
                <ul className="sb-social">
                    {AppData.social.map((item, key) => (
                    <li key={`mini-sidebar-social-item-${key}`}><a href={item.link} target="_blank" title={item.title}><i className={item.icon}></i></a></li>
                    ))}
                </ul>
            </div>
        </>
    );
};
export default MiniSidebar;
