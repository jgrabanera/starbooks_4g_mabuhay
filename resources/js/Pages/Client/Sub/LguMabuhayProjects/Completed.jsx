import { IoCheckmarkCircleOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const Completed = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/lgu-mabuhay.png"
        logoAlt="LGU Mabuhay"
        eyebrow="Municipal Project Archive"
        title="Completed Projects"
        searchPlaceholder="Search completed projects"
        emptyTitle="No completed projects found."
        emptyBody="Completed project records will appear here once they are added in the CMS."
        badgeLabel="Completed"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoCheckmarkCircleOutline}
        items={items}
        loading={loading}
        error={error}
    />
);

export default Completed;
