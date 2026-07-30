import { IoInformationCircleOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const DostIX = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/DOST.png"
        logoAlt="DOST"
        eyebrow="Regional Science And Technology Services"
        title="DOST Services"
        searchPlaceholder="Search DOST services"
        emptyTitle="No services found."
        emptyBody="DOST IX records will appear here once they are added in the CMS."
        badgeLabel="Service"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoInformationCircleOutline}
        items={items}
        loading={loading}
        error={error}
    />
);

export default DostIX;
