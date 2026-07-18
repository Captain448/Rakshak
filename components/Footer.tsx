import Link from "next/link";
import { Shield, ExternalLink, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-auto border-t-4 border-saffron-500">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: About */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-saffron-500" />
            <span className="font-bold text-lg tracking-wide">RAKSHAK AI</span>
          </div>
          <p className="text-xs text-govgray-200 leading-relaxed">
            National Public Safety Intelligence Platform designed to monitor, identify, and alert citizens and authorities about cybercrime, money-laundering mule rings, and digital arrest threats.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-bold text-sm tracking-wider uppercase border-b border-navy-700 pb-2 mb-4 text-saffron-500">
            Government Portals
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-govgray-200">
            <li>
              <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                National Cyber Crime Portal <ExternalLink className="h-3 w-3 inline" />
              </a>
            </li>
            <li>
              <a href="https://www.digilocker.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                DigiLocker Portal <ExternalLink className="h-3 w-3 inline" />
              </a>
            </li>
            <li>
              <a href="https://www.npci.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                NPCI India <ExternalLink className="h-3 w-3 inline" />
              </a>
            </li>
            <li>
              <a href="https://www.mha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                Ministry of Home Affairs <ExternalLink className="h-3 w-3 inline" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Safe Usage */}
        <div>
          <h4 className="font-bold text-sm tracking-wider uppercase border-b border-navy-700 pb-2 mb-4 text-saffron-500">
            Public Guidelines
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-govgray-200 list-disc list-inside">
            <li>Check caller IDs before answering.</li>
            <li>Never agree to online custody.</li>
            <li>Never share bank credentials or OTPs.</li>
            <li>Report counterfeit cash within 24h.</li>
          </ul>
        </div>

        {/* Col 4: Contact Helpdesk */}
        <div>
          <h4 className="font-bold text-sm tracking-wider uppercase border-b border-navy-700 pb-2 mb-4 text-saffron-500">
            National Helplines
          </h4>
          <div className="flex flex-col gap-3 text-xs text-govgray-200">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-saffron-500 shrink-0" />
              <div>
                <p className="font-semibold text-white">Cyber Crime Helpline</p>
                <p className="text-saffron-500 text-sm font-bold">1930</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-saffron-500 shrink-0" />
              <p>support-rakshak@gov.in</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-saffron-500 shrink-0" />
              <p>MHA Cyber Division, New Delhi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-navy-900 border-t border-navy-800 py-4 px-6 text-center text-[10px] text-govgray-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 National Cyber Crime Reporting Portal. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white">Privacy Policy</Link>
            <span>•</span>
            <Link href="/" className="hover:text-white">Terms of Service</Link>
            <span>•</span>
            <Link href="/" className="hover:text-white">Hyperlinking Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
