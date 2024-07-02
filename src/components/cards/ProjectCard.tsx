// modules
import Link from 'next/link'
import { When } from 'react-if'
// components
import { ArwFlex, ArwPaper, ArwText, ArwTitle } from '@/components/arw'
import Manipulations from '@/components/shared/Manipulations'
// lib
import { debug } from '@/lib/utils/dev'
import { generateUrl } from '@/lib/utils'
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
	return (
		<ArwPaper
			accent
			square
			className="relative justify-between px-5 py-4 group max-lg:aspect-video"
		>
			<Link
				href={generateUrl(
					[profile ? routes.PROFILE : routes.PROJECTS, project.slug],
					searchParams
				)}
				className="absolute inset-0 z-20"
			/>
			<ArwFlex row between className="relative">
				<ArwTitle className="group-hover:text-accent transition cursor-pointer relative z-10">
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
			<ArwText className="relative z-10">{project.info}</ArwText>
		</ArwPaper>
	)
}
