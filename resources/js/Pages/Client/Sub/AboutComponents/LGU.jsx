import { useEffect, useState } from "react";
import { IoPeopleOutline, IoSearchOutline } from "react-icons/io5";

const barangays = [
    {
        id: 1,
        title: "Abunda",
        reference: "BRGY-001",
        population: 893,
        officials: {
            captain: "Juan Dela Cruz",
            secretary: "Maria Santos",
            treasurer: "Pedro Reyes",
            skChairperson: "Angela Flores",
            kagawads: [
                "Ramon Garcia",
                "Liza Mendoza",
                "Joel Ramos",
                "Catherine Cruz",
                "Dennis Torres",
                "Marvin Lopez",
                "Jenny Villanueva",
            ],
        },
    },
    {
        id: 2,
        title: "Bagong Silang (Tumalog)",
        reference: "BRGY-002",
        population: 1596,
        officials: {
            captain: "Michael Fernandez",
            secretary: "Rose Ann Diaz",
            treasurer: "Edgar Castillo",
            skChairperson: "Kristine Bautista",
            kagawads: [
                "Leo Ramos",
                "Allan Flores",
                "Grace Mendoza",
                "Joseph Cruz",
                "Paul Garcia",
                "Emily Santos",
                "Rico Navarro",
            ],
        },
    },
    {
        id: 3,
        title: "Bangkaw-bangkaw",
        reference: "BRGY-003",
        population: 1750,
        officials: {
            captain: "Mark Anthony Torres",
            secretary: "Jennifer Lopez",
            treasurer: "Antonio Rivera",
            skChairperson: "Kate Fernandez",
            kagawads: [
                "Ryan Mendoza",
                "Erwin Garcia",
                "Patrick Cruz",
                "Jessa Ramos",
                "Arnold Diaz",
                "Michelle Reyes",
                "Carlo Flores",
            ],
        },
    },
    {
        id: 4,
        title: "Caliran (Turko)",
        reference: "BRGY-004",
        population: 2828,
        officials: {
            captain: "Roberto Mendoza",
            secretary: "Janice Torres",
            treasurer: "Noel Santos",
            skChairperson: "Camille Ramos",
            kagawads: [
                "Vincent Cruz",
                "Leo Bautista",
                "James Navarro",
                "Rose Garcia",
                "Alvin Reyes",
                "Gerald Flores",
                "Karen Diaz",
            ],
        },
    },
    {
        id: 5,
        title: "Catipan",
        reference: "BRGY-005",
        population: 1486,
        officials: {
            captain: "Richard Garcia",
            secretary: "Melissa Cruz",
            treasurer: "Victor Santos",
            skChairperson: "Alyssa Mendoza",
            kagawads: [
                "Jordan Flores",
                "Jerome Torres",
                "Paolo Diaz",
                "Rhea Navarro",
                "Joel Reyes",
                "Monica Garcia",
                "Daniel Ramos",
            ],
        },
    },
    {
        id: 6,
        title: "Kauswagan",
        reference: "BRGY-006",
        population: 1600,
        officials: {
            captain: "Edwin Morales",
            secretary: "Sheila Gonzales",
            treasurer: "Rommel Fernandez",
            skChairperson: "Jasmine Aquino",
            kagawads: [
                "Mario Santos",
                "Kevin Cruz",
                "Jonathan Flores",
                "Ricky Ramos",
                "Ana Garcia",
                "Carla Mendoza",
                "Julius Reyes",
            ],
        },
    },
    {
        id: 7,
        title: "Ligaya",
        reference: "BRGY-007",
        population: 1799,
        officials: {
            captain: "Fernando Castillo",
            secretary: "Leah Torres",
            treasurer: "Jerome Garcia",
            skChairperson: "Nicole Perez",
            kagawads: [
                "Marvin Santos",
                "Lester Cruz",
                "Jayson Reyes",
                "April Mendoza",
                "Maricel Flores",
                "Brian Ramos",
                "Joan Diaz",
            ],
        },
    },
    {
        id: 8,
        title: "Looc-Barlak",
        reference: "BRGY-008",
        population: 2297,
        officials: {
            captain: "Victor Navarro",
            secretary: "Elaine Santos",
            treasurer: "Ronald Mendoza",
            skChairperson: "Aira Lopez",
            kagawads: [
                "John Garcia",
                "Richard Cruz",
                "Francis Ramos",
                "Hazel Flores",
                "Ruben Diaz",
                "Carlo Mendoza",
                "Liza Reyes",
            ],
        },
    },
    {
        id: 9,
        title: "Malinao (Sagasa)",
        reference: "BRGY-009",
        population: 3788,
        officials: {
            captain: "Danilo Bautista",
            secretary: "Karen Cruz",
            treasurer: "Rolando Garcia",
            skChairperson: "Patricia Mendoza",
            kagawads: [
                "Edgar Ramos",
                "Michael Flores",
                "Jerwin Diaz",
                "Shane Reyes",
                "Arnold Navarro",
                "Dennis Santos",
                "Mae Torres",
            ],
        },
    },
    {
        id: 10,
        title: "Pamansaan",
        reference: "BRGY-010",
        population: 1155,
        officials: {
            captain: "Rogelio Ramos",
            secretary: "Sarah Garcia",
            treasurer: "Emmanuel Cruz",
            skChairperson: "Kimberly Torres",
            kagawads: [
                "Leo Fernandez",
                "Albert Mendoza",
                "Marvin Reyes",
                "Grace Flores",
                "Joel Santos",
                "Erica Diaz",
                "Nathan Lopez",
            ],
        },
    },
    {
        id: 11,
        title: "Pinalim (San Roque)",
        reference: "BRGY-011",
        population: 1573,
        officials: {
            captain: "Benjamin Flores",
            secretary: "Angelica Ramos",
            treasurer: "Joseph Navarro",
            skChairperson: "Christine Garcia",
            kagawads: [
                "Allan Cruz",
                "Richard Santos",
                "Patrick Mendoza",
                "Michelle Reyes",
                "Harold Diaz",
                "Rhea Torres",
                "Dennis Bautista",
            ],
        },
    },
    {
        id: 12,
        title: "Poblacion (Mabuhay)",
        reference: "BRGY-012",
        population: 4765,
        officials: {
            captain: "Alexander Mendoza",
            secretary: "Joy Santos",
            treasurer: "Carlos Fernandez",
            skChairperson: "Angela Cruz",
            kagawads: [
                "Robert Garcia",
                "Michael Ramos",
                "Leo Flores",
                "Paula Reyes",
                "John Diaz",
                "Ryan Torres",
                "Kevin Navarro",
            ],
        },
    },
    {
        id: 13,
        title: "Punawan",
        reference: "BRGY-013",
        population: 1466,
        officials: {
            captain: "Nestor Garcia",
            secretary: "Diane Mendoza",
            treasurer: "Ramon Santos",
            skChairperson: "Princess Flores",
            kagawads: [
                "Joel Cruz",
                "Arnold Ramos",
                "Victor Reyes",
                "Jessa Torres",
                "Rico Diaz",
                "Lester Navarro",
                "April Garcia",
            ],
        },
    },
    {
        id: 14,
        title: "Santo Nino (Caliran)",
        reference: "BRGY-014",
        population: 1321,
        officials: {
            captain: "Oscar Reyes",
            secretary: "Janine Cruz",
            treasurer: "Anthony Garcia",
            skChairperson: "Faith Ramos",
            kagawads: [
                "Paul Flores",
                "Harold Mendoza",
                "Ruben Santos",
                "Monica Diaz",
                "John Navarro",
                "Marvin Torres",
                "Kim Lopez",
            ],
        },
    },
    {
        id: 15,
        title: "Sawa",
        reference: "BRGY-015",
        population: 3027,
        officials: {
            captain: "Ricardo Torres",
            secretary: "Michelle Garcia",
            treasurer: "Arnold Reyes",
            skChairperson: "Bea Santos",
            kagawads: [
                "Noel Mendoza",
                "Ryan Cruz",
                "Dennis Flores",
                "Karen Diaz",
                "Joel Ramos",
                "Patrick Navarro",
                "Leo Garcia",
            ],
        },
    },
    {
        id: 16,
        title: "Sioton",
        reference: "BRGY-016",
        population: 842,
        officials: {
            captain: "Gerardo Santos",
            secretary: "Camille Flores",
            treasurer: "Edwin Garcia",
            skChairperson: "Angel Mendoza",
            kagawads: [
                "Joseph Cruz",
                "Allan Ramos",
                "Carlo Diaz",
                "Liza Reyes",
                "Jerome Torres",
                "Rhea Navarro",
                "Patrick Garcia",
            ],
        },
    },
    {
        id: 17,
        title: "Taguisian",
        reference: "BRGY-017",
        population: 3778,
        officials: {
            captain: "Alfredo Cruz",
            secretary: "Mary Ann Santos",
            treasurer: "Benjamin Torres",
            skChairperson: "Kate Flores",
            kagawads: [
                "Ricky Mendoza",
                "Marvin Garcia",
                "Paul Reyes",
                "Sheila Diaz",
                "Kevin Ramos",
                "Arnold Navarro",
                "Grace Cruz",
            ],
        },
    },
    {
        id: 18,
        title: "Tandu-Comot (Katipunan)",
        reference: "BRGY-018",
        population: 1426,
        officials: {
            captain: "Wilfredo Garcia",
            secretary: "Jean Ramos",
            treasurer: "Richard Flores",
            skChairperson: "Lovely Santos",
            kagawads: [
                "John Mendoza",
                "Leo Reyes",
                "Dennis Cruz",
                "Michelle Navarro",
                "Brian Diaz",
                "April Torres",
                "Ryan Garcia",
            ],
        },
    },
];

const LGU = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredBarangays = barangays.filter((barangay) => {
        const searchableContent = [
            barangay.title,
            barangay.reference,
            barangay.population,
            barangay.officials.captain,
            barangay.officials.secretary,
            barangay.officials.treasurer,
            barangay.officials.skChairperson,
            ...barangay.officials.kagawads,
        ]
            .join(" ")
            .toLowerCase();

        return searchableContent.includes(searchTerm.trim().toLowerCase());
    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredBarangays.length / itemsPerPage),
    );

    const paginatedBarangays = filteredBarangays.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <div className="rounded-[1.75rem] border border-white/80 bg-white/55 p-4 shadow-lg backdrop-blur-md md:p-6 md:[@media(orientation:portrait)]:max-h-[82vh] md:[@media(orientation:portrait)]:min-h-[82vh]">
            <div className="mx-auto flex min-h-[78vh] max-w-5xl flex-col">
                <div className="text-center">
                    <img
                        src="/assets/images/logos/lgu-mabuhay.png"
                        alt="LGU Mabuhay"
                        className="mx-auto h-20 w-auto"
                    />
                    <p className="mt-4 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-emerald-800 md:text-xs">
                        Barangay Reference Collection
                    </p>
                    <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-emerald-700/80 md:text-[0.65rem]">
                        Municipal Directory Layout Preview
                    </p>
                    <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.06em] text-emerald-950 md:text-4xl">
                        Municipality of Mabuhay
                    </h1>
                </div>

                <div className="mx-auto mt-6 w-full md:max-w-xl">
                    <label htmlFor="barangay-search" className="sr-only">
                        Search barangays
                    </label>
                    <div className="flex w-full items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-emerald-800 shadow-md">
                        <IoSearchOutline className="h-4 w-4 shrink-0" />
                        <input
                            id="barangay-search"
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            placeholder="Search barangay, official, or reference"
                            className="w-full max-w-6xl border-none bg-transparent text-sm font-medium placeholder:text-emerald-700/70 focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {paginatedBarangays.map((barangay, index) => {
                        const itemNumber =
                            (currentPage - 1) * itemsPerPage + index + 1;

                        return (
                            <article
                                key={barangay.id}
                                className="group relative overflow-hidden rounded-[1.2rem] border border-emerald-100/80 bg-white/85 shadow-md transition duration-200 hover:-translate-y-0.5"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(236,253,245,0.88),rgba(254,252,232,0.72))]" />
                                <div className="relative z-10 grid min-h-[10.25rem] gap-3 p-4 md:grid-cols-[minmax(0,1fr)_6rem]">
                                    <div className="flex min-w-0 flex-col">
                                        {/* <div className="flex items-start justify-between gap-3">
                                            <span className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-emerald-800">
                                                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-100 px-1 text-[0.62rem] text-emerald-700">
                                                    {itemNumber}
                                                </span>
                                                Barangay
                                            </span>
                                        </div> */}

                                        <h2 className="mt-3 text-sm font-semibold text-slate-900 md:text-base">
                                            {barangay.title}
                                        </h2>

                                        <div className="mt-3 space-y-1 text-xs leading-5 text-slate-600 md:text-sm">
                                            <p>
                                                <span className="font-semibold text-emerald-800">
                                                    Brgy. Captain:
                                                </span>{" "}
                                                {barangay.officials.captain}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-emerald-800">
                                                    Secretary:
                                                </span>{" "}
                                                {barangay.officials.secretary}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-emerald-800">
                                                    Treasurer:
                                                </span>{" "}
                                                {barangay.officials.treasurer}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-800">
                                                {barangay.reference}
                                            </p>
                                            <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-slate-500">
                                                <IoPeopleOutline className="h-3.5 w-3.5 text-emerald-700" />
                                                <span>
                                                    {barangay.population.toLocaleString()}{" "}
                                                    population
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto hidden overflow-hidden rounded-xl border border-white/80 shadow-sm md:block">
                                        <img
                                            src="/assets/images/lgu_mabuhay.jpg"
                                            alt=""
                                            aria-hidden="true"
                                            className="h-24 w-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="h-1 w-full bg-gradient-to-r from-emerald-700 to-yellow-400" />
                            </article>
                        );
                    })}
                </div>

                {filteredBarangays.length > 0 && totalPages > 1 ? (
                    <div className="mt-auto flex flex-wrap items-center justify-center gap-2 pt-8">
                        <button
                            type="button"
                            onClick={() =>
                                setCurrentPage((page) => Math.max(1, page - 1))
                            }
                            disabled={currentPage === 1}
                            className="rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-md transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => {
                            const pageNumber = index + 1;
                            const isActive = currentPage === pageNumber;

                            return (
                                <button
                                    key={pageNumber}
                                    type="button"
                                    onClick={() => setCurrentPage(pageNumber)}
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold shadow-md transition ${
                                        isActive
                                            ? "border-emerald-700 bg-emerald-700 text-white"
                                            : "border-emerald-200 bg-white/85 text-emerald-800 hover:bg-emerald-50"
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() =>
                                setCurrentPage((page) =>
                                    Math.min(totalPages, page + 1),
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-md transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                ) : null}

                {filteredBarangays.length === 0 ? (
                    <div className="mt-8 rounded-[1.5rem] border border-dashed border-emerald-300 bg-white/65 px-5 py-8 text-center shadow-md">
                        <p className="text-base font-bold text-emerald-950">
                            No barangays found.
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                            Try a different keyword or clear the search field.
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default LGU;
