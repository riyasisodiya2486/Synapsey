import { SidebarItems } from "./SidebarItems"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { Logo } from "../icons/Logo"
import { InstagramIcon } from "../icons/InstagramIcon"


export function Sidebar(){
    return <div className="h-screen w-60 fixed left-0 top-0 bg-white/10 backdrop-blur-md border border-white/20 p-4
           text-white shadow-xl rounded-r-2xl px-6 py-6 flex flex-col gap-6">
     
      <div className="flex items-center text-2xl font-semibold">
        <div className="mr-3">
          <Logo />
        </div>
        Synapsey
      </div>
      
      {/* Items  */}
      <div className="flex flex-col gap-2">
        <SidebarItems text="Twitter" icon={<TwitterIcon />} />
        <SidebarItems text="Youtube" icon={<YoutubeIcon />} />
        <SidebarItems text="Instagram" icon={<InstagramIcon/>}/>
      </div>
    </div>
}