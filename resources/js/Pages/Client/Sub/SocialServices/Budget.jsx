import { IoCashOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const Budget = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/lgu-mabuhay.png"
        logoAlt="LGU Mabuhay"
        eyebrow="Social Services Records"
        title="Budget"
        searchPlaceholder="Search budget items"
        emptyTitle="No budget items found."
        emptyBody="Budget records will appear here once they are added in the CMS."
        badgeLabel="Budget"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoCashOutline}
        items={items}
        loading={loading}
        error={error}
    />
);

export default Budget;
