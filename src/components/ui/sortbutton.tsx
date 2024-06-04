import {ArrowDown01, ArrowDownAZ, ArrowUp10, ArrowUpDown, ArrowUpZA} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import React from "react";

export type SortButtonDirection = "asc" | "desc" | "none"

export type SortButtonProps = {
    children: React.ReactNode,
    variant?: "alpha" | "numeric",
    value: SortButtonDirection,
    onChange: (nextDirection: SortButtonDirection) => void
}

const icon: Record<SortButtonDirection, React.ReactNode> = {
    "asc": <ArrowDownAZ size={16} />,
    "desc": <ArrowUpZA size={16} />,
    "none": <ArrowUpDown size={16} className={"opacity-0 transition-opacity group-hover:opacity-100"}/>
}

const iconNumeric: Record<SortButtonDirection, React.ReactNode> = {
    "asc": <ArrowDown01 size={16} />,
    "desc": <ArrowUp10 size={16} />,
    "none": <ArrowUpDown size={16} className={"opacity-0 transition-opacity group-hover:opacity-100"}/>
}

export function SortButton({ children, variant = "alpha", value, onChange }: SortButtonProps) {

    function handleClick() {
        if(value === "none") {
            onChange("asc");
        }
        else if(value === "asc") {
            onChange("desc")
        }
        else {
            onChange("none")
        }
    }

    return (
        <Button variant={"ghost"} className={"flex gap-1 -ml-4 group"} onClick={handleClick}>
            { children }
            {variant === "numeric" ? iconNumeric[value] : icon[value]}
        </Button>
    )
}