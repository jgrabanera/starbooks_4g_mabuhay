import { IoColorPaletteOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const Festivities = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/lgu-mabuhay.png"
        logoAlt="LGU Mabuhay"
        eyebrow="Tourism Updates"
        title="Festivities"
        searchPlaceholder="Search festivities"
        emptyTitle="No festivities found."
        emptyBody="Festivity records will appear here once they are added in the CMS."
        badgeLabel="Festivity"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoColorPaletteOutline}
        items={items}
        loading={loading}
        error={error}
        useAttachmentModal
    />
);

export default Festivities;
