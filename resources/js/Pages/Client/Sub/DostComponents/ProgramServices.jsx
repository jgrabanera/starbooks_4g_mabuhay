import { IoGridOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const ProgramServices = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/DOST.png"
        logoAlt="DOST"
        eyebrow="Programs And Services"
        title="DOST Services"
        searchPlaceholder="Search services"
        emptyTitle="No program services found."
        emptyBody="Program and service records will appear here once they are added in the CMS."
        badgeLabel="Program"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoGridOutline}
        items={items}
        loading={loading}
        error={error}
    />
);

export default ProgramServices;
