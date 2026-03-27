import AppData from "@data/app.json";
import AboutData from "@data/sections/about-2.json";

const MiniSidebar = () => {
    const aboutParagraph = AboutData.description.match(/<p>.*?<\/p>/)?.[0] || AboutData.description;

    return (
        <>
            <div className="sb-infobar-content">
                <div className="sb-ib-title-frame sb-mb-30">
                    <h4>Contact</h4><i className="fas fa-arrow-down"></i>
                </div>
                <ul className="sb-list sb-mb-30">
                    <li><b>Address:</b><span>Addis Ababa, Ethiopia</span></li>
                    <li><b>Working hours:</b><span>09:00 - 23:00</span></li>
                    <li><b>Phone:</b><span>+251 919 747309</span></li>
                    <li><b>Email:</b><span>ekdtechsolution@mail.com</span></li>
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
