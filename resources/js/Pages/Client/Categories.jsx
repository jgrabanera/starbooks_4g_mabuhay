import { Head, Link } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import { useEffect, useState } from "react";
import axios from "axios";

function getImageUrl(image) {
    if (/^(https?:|data:|blob:)/i.test(image)) {
        return image;
    }

    if (image.startsWith("/")) {
        return image;
    }

    return `/storage/images/thumbnails/${image.replace(/^storage\/images\//, "thumbnails/")}`;
}

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/get-categories`);

            setCategories(res.data);
        } catch (requestError) {
            console.log("Error loading categories:", requestError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const lightGradients = [
        "from-white/50 via-yellow-200/70 to-orange-400/90",
        "from-white/50 via-lime-200/70 to-emerald-300/90",
        "from-white/50 via-sky-200/70 to-cyan-300/90",
        "from-white/50 via-pink-200/70 to-rose-300/90",
        "from-white/50 via-purple-200/70 to-indigo-300/90",
        "from-white/50 via-amber-200/70 to-yellow-400/90",
    ];

    return (
        <>
            <Head title="Categories" />
            <div className="category-screen grid w-full self-start place-items-center text-emerald-950">
                <section className="category-wrap mx-auto w-full px-4 py-4 sm:px-6 md:px-8">
                    {loading && (
                        <p className="py-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-emerald-950">
                            Loading categories...
                        </p>
                    )}

                    {!loading && categories.length === 0 && (
                        <p className="py-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-emerald-950">
                            No categories found.
                        </p>
                    )}

                    <div className="category-grid mx-auto grid w-full grid-cols-2 xl:gap-24 lg:gap-20">
                        {categories.map((category, index) => {
                            const imageUrl = category.image
                                ? getImageUrl(category.image)
                                : null;

                            return (
                                <Link
                                    key={category.id}
                                    href={`/categories/sub-categories/${category.slug}`}
                                >
                                    <div
                                        key={
                                            category.id ??
                                            category.title ??
                                            category.label
                                        }
                                        className="category-card group relative overflow-visible transition duration-300 ease-out hover:-translate-y-1 focus-within:-translate-y-1"
                                        style={{
                                            "--category-delay": `${index * 60}ms`,
                                        }}
                                    >
                                        <div className="category-card-panel absolute inset-x-0 bottom-0 overflow-hidden rounded-2xl border-2 border-white/85 bg-gradient-to-br from-yellow-700/55 via-lime-700/50 to-yellow-600/60 shadow-[0_18px_38px_rgba(75,58,8,0.3)] backdrop-blur-[2px] transition duration-300 group-hover:shadow-[0_24px_48px_rgba(75,58,8,0.38)]">
                                            {imageUrl && (
                                                <img
                                                    src={imageUrl}
                                                    alt=""
                                                    loading="lazy"
                                                    className="category-card-backdrop absolute inset-0 h-full w-full scale-110 object-cover object-center  transition duration-700 ease-out group-hover:scale-[1.16]"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-white/60" />
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${
                                                    lightGradients[
                                                        index %
                                                            lightGradients.length
                                                    ]
                                                }`}
                                            />
                                            <div className="absolute inset-0 bg-yellow-950/10" />
                                        </div>
                                        {imageUrl && (
                                            <img
                                                src={imageUrl}
                                                alt={
                                                    category.title ||
                                                    category.label ||
                                                    "Category image"
                                                }
                                                loading="lazy"
                                                className="category-card-image category-floating-image absolute z-20 bg-white rounded-full border-[3px] border-white object-cover object-center shadow-[0_14px_28px_rgba(15,83,72,0.28)] "
                                            />
                                        )}

                                        <div className="category-card-content relative z-10 flex flex-col justify-end">
                                            {(category.title ||
                                                category.description) && (
                                                <div className="relative z-20 text-slate-950">
                                                    {category.title && (
                                                        <h3 className="category-card-title text-base font-black uppercase leading-tight tracking-[0.10em] sm:text-xl">
                                                            {category.title}
                                                        </h3>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </>
    );
}

Categories.layout = (page) => <HomeLayout>{page}</HomeLayout>;
