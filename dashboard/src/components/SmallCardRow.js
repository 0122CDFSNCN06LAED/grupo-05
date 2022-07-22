import SmallCard from "./SmallCard";

const statistics = [
    {
        title: "Proyects in database",
        value: 21,
        icon: "fa-film",
        color: "primary",
    },
    {
        title: "Total empresas",
        value: 79,
        icon: "fa-award",
        color: "success",
    },
    {
        title: "freelancers quantity",
        value: 49,
        icon: "fa-user",
        color: "warning",
    },
];

function SmallCardRow() {
    return (
        <div className="row">
            {statistics.map((stat) => {
                return <SmallCard key={stat.title} {...stat} />;
            })}
        </div>
    );
}

export default SmallCardRow;
