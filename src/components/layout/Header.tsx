'use client'
// modules
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// components
import { ArwLink, ArwIcon } from '@/components/arw'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Menu from '@/components/layout/Menu'
// lib
import { icons } from '@/lib/constants/paths'
import { debug } from '@/lib/utils/dev'

export default function Header() {
	const [isSheetOpen, setIsSheetOpen] = useState(false)
	const isMobile = useMediaQuery({ maxWidth: 768 })
	debug(9, 9, isMobile)
	return (
		<header className="sticky z-50 top-0 backdrop-blur-md bg-base-200/50 dark:bg-base-950/50  shadow-md p-4 h-[75px] flex-center">
			<div className="container flex justify-between p-0 xl:px-4">
				{/* left */}
				<div className="flex items-center">
					<ArwLink href={`/`}>
						<Image src="/images/logo.jpg" alt="Logo" width={132} height={75} />
					</ArwLink>
				</div>

				{/* center */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-center">
					<Sheet
						open={isSheetOpen}
						onOpenChange={setIsSheetOpen}
						modal={isMobile}
					>
						<SheetTrigger>
							<ArwIcon
								src={icons.MENU}
								className="hover:text-accent transtion"
							/>
						</SheetTrigger>
						<SheetContent
							side="top"
							className="backdrop-blur-md bg-base-200/50 dark:bg-base-950/50 border-none flex-center min-h-[75px]"
						>
							<Menu setOpen={setIsSheetOpen} />
						</SheetContent>
					</Sheet>
				</div>

				{/* right */}
				<div className="flex items-center">
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
					</SignedIn>
					<SignedOut>
						<Link
							href={`/sign-in`}
							className="hover:text-accent transition px-2"
						>
							Login
						</Link>
					</SignedOut>
				</div>
			</div>
		</header>
	)
}
