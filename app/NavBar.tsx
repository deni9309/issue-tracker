"use client"
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import classNames from 'classnames';

export default function NavBar() {
   const currentPath = usePathname();
   const navItem = 'my-auto p-2 hover:text-blue-800 transition';
   const active = 'bg-slate-100 rounded';

   const links = [
      { label: 'Dashboard', href: '/' },
      { label: 'Issues', href: '/issues' },
   ];

   return (
      <nav className='flex justify-around py-1 mb-7 border-b shadow-md shadow-slate-100'>
         <Link href="/">
            <Image src="/logo.png" alt='logo' width={100} height={100} priority />
         </Link>

         <ul className="flex justify-center md:gap-x-6 gap-x-2 md:text-base text-sm">
            {links.map(link => (
               <Link key={link.href} href={link.href}
                  className={classNames({
                     'my-auto p-2 hover:text-cyan-800 transition': true,
                     'bg-slate-100 rounded': link.href === currentPath
                  })}
               >
                  {link.label}
               </Link>
            ))}
         </ul>
      </nav>
   );
}

// {links.map(link => (
//       <Link key={link.href}
//          href={link.href}
//          className={`${navItem} ${currentPath === link.href ? active : ''}`}>
//          {link.label}
//       </Link>
//    ))}