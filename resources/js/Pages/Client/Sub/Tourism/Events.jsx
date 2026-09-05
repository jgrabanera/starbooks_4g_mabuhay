import { IoMegaphoneOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const Events = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/lgu-mabuhay.png"
        logoAlt="LGU Mabuhay"
        eyebrow="Tourism Updates"
        title="Tourism Events"
        searchPlaceholder="Search tourism events"
        emptyTitle="No tourism events found."
        emptyBody="Event records will appear here once they are added in the CMS."
        badgeLabel="Event"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoMegaphoneOutline}
        items={items}
        loading={loading}
        error={error}
        useAttachmentModal
    />
);

export default Events;
