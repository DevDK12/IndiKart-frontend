


interface CategoryItemProps {
    color: string;
    value: number;
    heading: string;
}



const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
    <div className="category-item grid grid-cols-5  items-center gap-2">
        <h5 className="font-semibold tracking-normal  text-sm md:text-lg col-span-2">{heading}</h5>
        <div className="bg-white rounded-md h-2 flex-none col-span-2">
            <div
                style={{
                    backgroundColor: color,
                    width: `${value}%`,
                }}
                className="h-full rounded-md col-span-2"
            ></div>
        </div>
        <span className="text-sm font-bold">{value}%</span>
    </div>
);


export default CategoryItem