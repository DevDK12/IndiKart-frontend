

interface AvatarProps {
    src: string,
    className?: string,
    onAvatar: () => void
}

const Avatar = ({ className, src, onAvatar }: AvatarProps) => {
    return (
        <div
            className={`${className ? className : ''} rounded-full cursor-pointer`}
            onClick={onAvatar}
        >
            <img src={src} alt="avatar"
                className={`${className ? className : ''} rounded-full`}
            />
        </div>
    )
}
export default Avatar