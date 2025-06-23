import type { ReactElement } from "react";

interface ButtonProps{
    variant: "primary"|"secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?:()=> void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    "primary":"bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white transition-all duration-300 shadow-md",
    "secondary":"bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 hover:from-pink-200 hover:via-purple-200 hover:to-blue-200 text-blue-900 transition-all duration-300 border border-blue-200",

}
const defaultStyles = "font-bold px-4 py-2 rounded-2xl font-light flex items-center justify-center space-x-2";

export function Button(props: ButtonProps){

    return <button onClick={props.onClick} className={`${variantClasses[props.variant]}
     ${defaultStyles} ${props.fullWidth ? " w-full flex justify-center items-center" : ""}
     ${props.loading? "opacity-45": ""}`} disabled={props.loading} >
        <div className="pr-2">
            {props.startIcon}
        </div>
        {props.text}
    </button>
}