
export default function IconButton({ 
    className, 
    Icon, 
    onClick, 
    active
}: { 
    className?: string;
    Icon: React.ReactNode; 
    onClick?: () => void;
    active: boolean;
}){

    return <button onClick={onClick} className={`${className} p-2 rounded-full border border-neutral-400 flex items-center justify-center ${active ? "text-blue-500" : "text-gray-200"}`}>
        {Icon}
    </button>
}
