// modules
import Link from 'next/link'
import { When } from 'react-if'
// components
import { ArwFlex, ArwPaper, ArwText, ArwTitle } from '@/components/arw'
import Manipulations from '@/components/shared/Manipulations'
// lib
import { debug } from '@/lib/utils/dev'
import { generateUrl, transformImageUrl } from '@/lib/utils'
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/lib/constants/paths'

export default function ProjectCard({
	project,
	categories,
	searchParams,
	profile,
}: {
	project: IProject
	categories: ICategory[]
	searchParams?: any
	profile?: boolean
}) {
	debug(8)
	const backgroundImageUrl = project.images[0]?.url
		? transformImageUrl(project.images[0].url, 'h_300')
		: null

	return (
		<ArwPaper
			accent
			square
			className="relative justify-between px-5 py-4 group max-lg:aspect-video overflow-hidden"
		>
			<div
				className="absolute inset-0 group-hover:opacity-80 transition"
				style={{
					backgroundImage: backgroundImageUrl
						? `url(${backgroundImageUrl})`
						: 'none',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			/>
			<Link
				href={generateUrl(
					[profile ? routes.PROFILE : routes.PROJECTS, project.slug],
					searchParams
				)}
				className="absolute inset-0 z-20"
			/>
			<ArwFlex row between className="relative">
				<ArwTitle className="cursor-pointer relative drop-shadow-lg z-10 text-white">
					{project.title}
				</ArwTitle>
				<When condition={profile}>
					<Manipulations
						project={project}
						categories={categories}
						className="relative z-30"
					/>
				</When>
			</ArwFlex>
			<ArwText className="relative z-10 transition opacity-0 group-hover:opacity-100 text-white drop-shadow-lg">
				{project.info}
			</ArwText>
		</ArwPaper>
	)
}
