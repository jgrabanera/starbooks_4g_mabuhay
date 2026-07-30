import { IoConstructOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const OnGoing = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/lgu-mabuhay.png"
        logoAlt="LGU Mabuhay"
        eyebrow="Municipal Project Tracker"
        title="On-Going Projects"
        searchPlaceholder="Search on-going projects"
        emptyTitle="No on-going projects found."
        emptyBody="Active project records will appear here once they are added in the CMS."
        badgeLabel="On-Going"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(250,204,21,0.72),rgba(16,185,129,0.84),rgba(5,150,105,0.95))]"
        AccentIcon={IoConstructOutline}
        items={items}
        loading={loading}
        error={error}
    />
);

export default OnGoing;
