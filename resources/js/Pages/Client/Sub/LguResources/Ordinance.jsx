import { IoReaderOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const Ordinance = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/lgu-mabuhay.png"
        logoAlt="LGU Mabuhay"
        eyebrow="LGU Resources Records"
        title="Ordinance"
        searchPlaceholder="Search ordinances"
        emptyTitle="No ordinances found."
        emptyBody="Ordinance records will appear here once they are added in the CMS."
        badgeLabel="Ordinance"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoReaderOutline}
        items={items}
        loading={loading}
        error={error}
        useAttachmentModal
    />
);

export default Ordinance;
