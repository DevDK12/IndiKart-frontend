


interface InputProps {
    label?: string,
    type: string,
    placeholder?: string,
    value?: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    variant?: 'FORM' | 'TEXTAREA' | 'FILE' | 'SEARCH',
}



const Input = ({ label, type, placeholder, value, onChange, variant='FORM' }: InputProps) => {

    
    if(variant === "SEARCH") return (
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

    return (
            <div className={`px-4 flex flex-col gap-2 sm:flex-row  sm:justify-between sm:items-center w-full`}>
                {label && <label>{label}</label>}
                <input
                    className={`w-full sm:w-2/3 rounded-md p-1 border-2 border-gray-400 focus:outline-none focus:border-cyan-400 ${type === "file" ? "text-white" : 'text-secondary-txt'}`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
    )
}


export default Input