import { cn } from "@/utils/utils";

interface SidebarItemProps {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: React.ComponentType<any>;
    url?: string;
    isSelected?: boolean;
    onClick?: () => void;
    rightIcon?: React.ReactNode;
    className?: string;
}

export const SidebarItem = ({
    title,
    icon: Icon,
    isSelected,
    onClick,
    rightIcon,
    className,
}: SidebarItemProps) => (
    <button
        type="button"
        onClick={onClick}
        className={cn(
            "w-full cursor-pointer flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium transition-all duration-150",
            isSelected
                ? "text-foreground font-semibold bg-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/20",
            className
        )}
    >
        <div className="flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5" />}
            <span>{title}</span>
        </div>
        {rightIcon}
    </button>
);
