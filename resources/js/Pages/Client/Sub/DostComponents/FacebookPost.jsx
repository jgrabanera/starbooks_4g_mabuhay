import { IoMailOutline } from "react-icons/io5";
import ContentCollectionPanel from "../shared/ContentCollectionPanel";

const FacebookPost = ({ items = [], loading = false, error = "" }) => (
    <ContentCollectionPanel
        logoSrc="/assets/images/logos/DOST.png"
        logoAlt="DOST"
        eyebrow="DOST Social Feed"
        title="DOST IX Facebook Posts"
        searchPlaceholder="Search Facebook posts"
        emptyTitle="No Facebook posts found."
        emptyBody="Facebook post records will appear here once they are added in the CMS."
        badgeLabel="Post"
        accentGradientClass="bg-[linear-gradient(135deg,rgba(5,150,105,0.92),rgba(16,185,129,0.78),rgba(250,204,21,0.62))]"
        AccentIcon={IoMailOutline}
        items={items}
        loading={loading}
        error={error}
    />
);

export default FacebookPost;
