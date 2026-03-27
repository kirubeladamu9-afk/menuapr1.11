import AppData from "@data/app.json";
import StoriesData from "@data/stories.json";

const MiniSidebar = () => {
    const [featuredStory, ...storyHighlights] = StoriesData.stories;

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
                        <img src={featuredStory.image} alt={featuredStory.title} />
                    </div>
                    <div className="sb-infobar-about-copy sb-mb-20">
                        <h5 className="sb-mb-10">{featuredStory.title}</h5>
                        <p className="sb-text sb-text-sm">{featuredStory.description}</p>
                    </div>
                    <div className="sb-infobar-about-highlights">
                        {storyHighlights.map((item, key) => (
                        <div className="sb-infobar-about-highlight" key={`mini-sidebar-story-item-${key + 1}`}>
                            <h5 className="sb-mb-5">{item.title}</h5>
                            <p className="sb-text sb-text-sm">{item.description}</p>
                        </div>
                        ))}
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
