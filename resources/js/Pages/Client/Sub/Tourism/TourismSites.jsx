import { IoLocationOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const TourismSites = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/lgu-mabuhay.png"
        logoAlt="LGU Mabuhay"
        eyebrow="Tourism Updates"
        title="Tourism Sites"
        searchPlaceholder="Search tourism sites"
        emptyTitle="No tourism sites found."
        emptyBody="Tourism site records will appear here once they are added in the CMS."
        badgeLabel="Site"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoLocationOutline}
        items={items}
        loading={loading}
        error={error}
        useAttachmentModal
    />
);

export default TourismSites;
