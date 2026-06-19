import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone, MessageCircle } from 'lucide-react'
import { AmaviLogo } from './AmaviLogo'
import { contact } from '../../data/amaviContent'
import { brandGuide } from '../../config/brandGuide'
import { whatsappUrl } from './WhatsAppButton'

export function Footer() {
  return (
    <footer className="mt-0 border-t border-amavi-brown/20 bg-amavi-brown text-amavi-cream">
      <div className="amavi-container grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-4">
          <AmaviLogo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/85">
            Turismo e hospitalidade angolana. Experiências memoráveis em Namibe e Huambo.
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#20bd5a]"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amavi-golden">Empresa</h4>
          <ul className="space-y-2.5 text-sm font-medium text-white/90">
            <li><Link to="/sobre" className="hover:text-amavi-golden">Sobre Nós</Link></li>
            <li><Link to="/guia-turistico" className="hover:text-amavi-golden">Guia Turístico</Link></li>
            <li><Link to="/experiencias" className="hover:text-amavi-golden">Experiências</Link></li>
            <li><Link to="/reservar" className="hover:text-amavi-golden">Reservar</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amavi-golden">Destinos</h4>
          <ul className="space-y-2.5 text-sm font-medium text-white/90">
            <li><Link to="/namibe" className="hover:text-amavi-golden">Namibe</Link></li>
            <li><Link to="/huambo" className="hover:text-amavi-golden">Huambo</Link></li>
            <li><Link to="/casa-2" className="hover:text-amavi-golden">Casa 2</Link></li>
            <li><Link to="/a-residencies" className="hover:text-amavi-golden">A Residencies</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amavi-golden">Contacto</h4>
          <ul className="space-y-3 text-sm text-white/90">
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-amavi-amber" />
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="font-medium hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-amavi-amber" />
              <a href={`mailto:${contact.email}`} className="font-medium hover:text-white">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram size={16} className="shrink-0 text-amavi-amber" />
              <span className="font-medium">{contact.website}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 px-4 py-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
          © {new Date().getFullYear()} AMAVI · Namibe & Huambo, Angola
        </p>
        <p className="mt-2 text-sm normal-case tracking-normal text-white/50">
          Criado pela{' '}
          <a
            href={brandGuide.agency.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-amavi-golden transition hover:text-white hover:underline"
          >
            {brandGuide.agency.name}
          </a>
          {' '}— {brandGuide.agency.tagline}
        </p>
      </div>
    </footer>
  )
}
