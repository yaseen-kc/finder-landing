import {
  COMPANY_NAME,
  COMPANY_TAGLINE,
  FOOTER_SECTIONS,
  FOOTER_BOTTOM_LINKS,
  COPYRIGHT_YEAR,
  FOOTER_LOGO,
  type FooterSection,
} from "../../constants/navigationBar/footerConstants";

function Logo() {
  return (
    <div className="font-semibold text-2xl tracking-tight select-none">
      <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
        {FOOTER_LOGO.PRIMARY}
      </span>{" "}
      <span className="text-zinc-100">{FOOTER_LOGO.SECONDARY}</span>
    </div>
  );
}

export default function FooterNav() {
  const sections: FooterSection[] = FOOTER_SECTIONS;

  return (
    <footer className="mt-16 border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-3 text-sm text-zinc-400 max-w-sm">{COMPANY_TAGLINE}</p>
          </div>

          {/* Links */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {sections.map((section) => (
              <nav key={section.title} aria-label={section.title}>
                <div className="text-sm font-semibold text-zinc-100">{section.title}</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-400">
            © {COPYRIGHT_YEAR} {COMPANY_NAME}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {FOOTER_BOTTOM_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

