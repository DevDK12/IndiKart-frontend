import { ChangeEvent } from "react"



interface InputProps {
    type: string,
    label?: string,
    placeholder?: string,
    value?: string | number,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onSelect?: (e: ChangeEvent<HTMLSelectElement>) => void,
    options?: string[],
    variant?: 'FORM' | 'TEXTAREA' | 'FILE' | 'SEARCH' | 'DATE' | 'SELECT' ,
}



const Input = ({ label, type, placeholder, value, onChange, options, variant = 'FORM', onSelect }: InputProps) => {


    if (variant === "SEARCH") return (
        <div className="flex flex-col gap-2 w-full">
            <input
                className={`w-full rounded-md p-2  text-secondary-txt`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )

    if (variant === "DATE") return (
        <div className={`px-4 flex flex-col gap-2 sm:flex-row  sm:justify-between sm:items-center w-full`}>
            {label && <label>{label}</label>}
            <input
                className={`w-full px-3 sm:w-2/3 rounded-md p-1 border-2 border-gray-400 focus:outline-none focus:border-cyan-400 text-secondary-txt`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )

    if (variant === 'SELECT') return (
        <div className="px-4 flex flex-col gap-2 sm:flex-row  sm:justify-between sm:items-center w-full">
            {label && <label>{label}</label>}
            <select
                className={`w-full px-3 sm:w-2/3 rounded-md p-1 border-2 border-gray-400 focus:outline-none focus:border-cyan-400 text-secondary-txt`}
                value={value}
                onChange={onSelect}
            >
                <option value="" disabled>{placeholder}</option>
                {options?.map((option, index) => (
                    <option
                        key={index}
                        value={option}
                    >{option}</option>
                ))
                }
            </select>
        </div>
    )


    return (
        <div className={`px-4 flex flex-col gap-2 sm:flex-row  sm:justify-between sm:items-center w-full`}>
            {label && <label>{label}</label>}
            <input
                className={`w-full px-3 sm:w-2/3 rounded-md p-1 border-2 border-gray-400 focus:outline-none focus:border-cyan-400 ${type === "file" ? "text-white" : 'text-secondary-txt'}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}


export default Input