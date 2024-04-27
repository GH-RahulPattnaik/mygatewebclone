/* eslint-disable @next/next/no-img-element */
"use client"

import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState, ReactNode } from "react"
import { useRouter } from 'next/navigation';

type SidebarContextType = {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType>({ expanded: true })

type SidebarProps = {
  children: ReactNode;
}

export default function SideBar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState<boolean>(true)

  return (
    <aside className={`h-screen sticky top-0 left-0 bottom-0 ${expanded ? "w-fit" : "w-fit"}`}>
      <nav className="h-full flex flex-col bg-white dark:bg-zinc-900 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img src="https://img.logoipsum.com/243.svg" className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt="" />
          <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-blue-500 hover:bg-blue-600">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        
      </nav>
    </aside>
  )
}

type SidebarLinkProps = {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  href?: string;
  dropdown: boolean;
}

export function SidebarLink({ href, text, active, alert, icon, dropdown }: SidebarLinkProps) {
  const router = useRouter();
  const { expanded } = useContext(SidebarContext);

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <li
      onClick={handleClick}
      className={` relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group dark:text-white ${
        active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-blue-800' : 'hover:bg-blue-500 dark:hover:bg-zinc-600 dark:text-white text-black'
      } `}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}>{text}</span>

      {dropdown && (
        <MoreVertical
          size={20}
          className={`
            absolute right-0 top-0 mr-3 mt-3
            ${expanded ? 'invisible opacity-0' : 'visible opacity-100'}
            transition-all
          `}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
          onMouseEnter={() => {}} // Removed unused logic
          onMouseLeave={() => {}} // Removed unused logic
        >
          {text}
        </div>
      )}
    </li>
  )
}