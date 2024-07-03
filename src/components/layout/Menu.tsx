'use client'
// modules
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { navigation } from '@/navigation'
// components
import Theme from './Theme'
import { ArwIcon } from '@/components/arw'
// lib
import { useMobile } from '@/lib/utils/hooks'

const MenuItem = ({
	link,
	setOpen,
	publicRoute,
}: {
	link: any
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	publicRoute: boolean
}) => {
	const pathname = usePathname()
	const isMobile = useMobile()
	const isActive = link.route.split('?')[0] === pathname
	const { isSignedIn } = useAuth()
	const handleClick = () => {
		if (isMobile) {
			setOpen(false)
		}
	}
	if (!publicRoute && !isSignedIn) return null

	return (
		<li
			className={`${isActive && 'text-accent'} hover:text-accent transition`}
			onClick={handleClick}
		>
			<Link
				className="flex items-center justify-center max-md:justify-start max-md:gap-2"
				href={link.route}
			>
				<ArwIcon className="w-[35px] flex-center" src={link.icon} />
				{link.label}
			</Link>
		</li>
	)
}

export default function Menu({
	setOpen,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<nav className="flex-center">
			<ul className="flex max-md:flex-col md:items-center gap-6">
				{navigation.map((link) => {
					return (
						<MenuItem
							key={link.route}
							link={link}
							setOpen={setOpen}
							publicRoute={link.public}
						/>
					)
				})}
				<li className="flex-center">
					<Theme setOpen={setOpen} />
				</li>
			</ul>
		</nav>
	)
}
