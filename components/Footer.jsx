import { footerLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function FooterColumn({ title, links }) {
  return (
    <div className="footer_column">
      <h4 className="font-semibold">{title}</h4>

      <ul className="flex flex-col gap-2 font-normal">
        {links.map((link) => (
          <Link key={link} href="/">{link}</Link>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <footer className='flexStart footer'>
      <div className='flex flex-col gap-12 w-full'>
        <div className='flex flex-col items-start'>
          <Image src="/logo-purple.svg" alt='logo' height={38} width={115} />

          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Dribbble is the world's leading community for creatives to share, grow, and get hired.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />

          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
            <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
          </div>

          <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links} />

          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links} />
            <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links} />
          </div>

          <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links} />
        </div>

        <div className="flexBetween footer_copyright">
          <p>@ 2025 Flexibbble. All rights reserved.</p>

          <p className="text-gray">
            <span className="text-black font-semibold">10,000+</span> projects submitted
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer