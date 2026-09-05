import { IoRibbonOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const AwardPosting = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/lgu-mabuhay.png"
        logoAlt="LGU Mabuhay"
        eyebrow="LGU Resources Records"
        title="Award Posting"
        searchPlaceholder="Search award postings"
        emptyTitle="No award postings found."
        emptyBody="Award posting records will appear here once they are added in the CMS."
        badgeLabel="Award"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoRibbonOutline}
        items={items}
        loading={loading}
        error={error}
        useAttachmentModal
    />
);

export default AwardPosting;
