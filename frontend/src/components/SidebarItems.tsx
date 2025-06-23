import type { ReactElement } from "react";

interface inputItems{
    text: string;
    icon: ReactElement
}

export function SidebarItems(props: inputItems)
{
    return <div className="flex items-center w-full px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition duration-200 cursor-pointer">
      <div className="mr-3 text-lg">{props.icon}</div>
      <span className="text-sm font-medium">{props.text}</span>
    </div>
}