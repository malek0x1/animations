import Link from "next/link";

export function Header() {
  return (
    <header className="absolute top-5 left-0 right-0 mx-10 z-50 rounded bg-white/80 backdrop-blur-sm">
      <div className="container  px-6 md:px-8 py-4 md:py-6">
        <div className="flex items-center justify-between ">
          
          <nav className="hidden md:flex items-center gap-8 mx-auto md:flex-1">
            <Link href="#about" className="text-sm hover:text-gray-600">About</Link>
            <Link href="#news" className="text-sm hover:text-gray-600">News</Link>
            <Link href="#services" className="text-sm hover:text-gray-600">Services</Link>
            <Link href="#team" className="text-sm hover:text-gray-600">Our Team</Link>
            <Link href="#enquiry" className="text-sm hover:text-gray-600">Make Enquiry</Link>
          </nav>
          
          <Link 
            href="#contact" 
            className="inline-flex items-center gap-2 border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors md:ml-auto"
          >
            Contact us
            <span>→</span>
          </Link>
          
          <input type="checkbox" id="menu-toggle" className="peer hidden" />
          
          <label 
            htmlFor="menu-toggle" 
            className="md:hidden cursor-pointer p-2 peer-checked:[&>svg>path:first-child]:rotate-45 peer-checked:[&>svg>path:first-child]:translate-y-[7px] peer-checked:[&>svg>path:nth-child(2)]:opacity-0 peer-checked:[&>svg>path:last-child]:-rotate-45 peer-checked:[&>svg>path:last-child]:-translate-y-[7px]"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 6h18" strokeWidth="2" strokeLinecap="round" className="transition-transform origin-center" />
              <path d="M3 12h18" strokeWidth="2" strokeLinecap="round" className="transition-opacity" />
              <path d="M3 18h18" strokeWidth="2" strokeLinecap="round" className="transition-transform origin-center" />
            </svg>
          </label>
          
          <nav className="hidden peer-checked:flex md:hidden fixed top-[72px] left-0 right-0 bg-white border-t shadow-lg flex-col">
            <Link href="#about" className="px-6 py-4 border-b hover:bg-gray-50">About</Link>
            <Link href="#news" className="px-6 py-4 border-b hover:bg-gray-50">News</Link>
            <Link href="#services" className="px-6 py-4 border-b hover:bg-gray-50">Services</Link>
            <Link href="#team" className="px-6 py-4 border-b hover:bg-gray-50">Our Team</Link>
            <Link href="#enquiry" className="px-6 py-4 hover:bg-gray-50">Make Enquiry</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}