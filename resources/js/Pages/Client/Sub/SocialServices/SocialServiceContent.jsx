import { IoFolderOpenOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const SocialServiceContent = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/lgu-mabuhay.png"
        logoAlt="LGU Mabuhay"
        eyebrow="Social Services"
        title="Social Services"
        searchPlaceholder="Search social services"
        emptyTitle="No social services found."
        emptyBody="Social service records will appear here once they are added in the CMS."
        badgeLabel="Social Service"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoFolderOpenOutline}
        items={items}
        loading={loading}
        error={error}
        useAttachmentModal
    />
);

export default SocialServiceContent;
