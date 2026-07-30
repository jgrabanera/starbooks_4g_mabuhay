import { IoFolderOpenOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const LGUResources = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/lgu-mabuhay.png"
        logoAlt="LGU Mabuhay"
        eyebrow="Public Resource Library"
        title="LGU Resources"
        searchPlaceholder="Search resources"
        emptyTitle="No resources found."
        emptyBody="Resource records will appear here once they are added in the CMS."
        badgeLabel="Resource"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoFolderOpenOutline}
        items={items}
        loading={loading}
        error={error}
    />
);

export default LGUResources;
