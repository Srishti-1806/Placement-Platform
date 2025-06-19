import Link from "next/link"
import { Briefcase, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const footerLinks = {
    Product: [
      { name: "Speech Analyzer", href: "/speech-analyzer" },
      { name: "Resume Builder", href: "/resume-builder" },
      { name: "ATS Calculator", href: "/ats-calculator" },
      { name: "Community", href: "/community" },
    ],
    Resources: [
      { name: "DSA Sheets", href: "/dsa-sheets" },
      { name: "Company Materials", href: "/company-materials" },
      { name: "Job Vacancies", href: "/vacancies" },
      { name: "Blog", href: "/blog" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">PlacementPro</span>
            </div>
            <p className="text-gray-400 mb-4">Your complete placement solution for landing dream jobs.</p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@placementpro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PlacementPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
