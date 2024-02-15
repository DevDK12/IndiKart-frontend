import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";



interface SidebarItemProps {
    path: string;
    label: string;
    Icon: IconType;
    isExpanded: boolean
}


const SidebarItem = ({ path, label, Icon, isExpanded }: SidebarItemProps) => {

    const itemClass = `rounded-lg px-4 py-2 hover:bg-primary-200 flex items-center cursor-pointer gap-3 xs:gap-4 relative  ${!isExpanded ? 'group' : ''}`;


    return (
        <li>
            <NavLink
                to={path}
                className={({ isActive }) => isActive ? `${itemClass} bg-accent-200 text-accent-txt` : `${itemClass}`}
            >
                <div>
                    {<Icon className="w-5 h-5" />}
                </div>
                {isExpanded &&
                    <p>{label}</p>
                }
            </NavLink>
        </li>
    )
}
export default SidebarItem