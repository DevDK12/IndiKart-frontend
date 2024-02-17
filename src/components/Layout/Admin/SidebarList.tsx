import SidebarItem from "./SidebarItem"


import { SidebarItemType } from "./AdminSidebar"


interface SidebarListProps {
    items: SidebarItemType[],
    isExpanded?: boolean,
    title: string
}



const SidebarList = ({ items, isExpanded=true, title }: SidebarListProps) => {
    return (
        <section>
            <ul className="flex flex-col gap-4">
                <h5 className={` ${isExpanded ? 'text-primary-txt' : 'opacity-0'}`}>{title}</h5>
                {items.map((item) => (
                    <SidebarItem
                        key={item.id}
                        Icon={item.icon}
                        label={item.label}
                        path={item.path}
                        isExpanded={isExpanded}
                    />
                ))}
            </ul>
        </section>

    )
}
export default SidebarList