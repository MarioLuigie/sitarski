'use client'
// modules
import Image from 'next/image'
import { useEffect, useState, useRef, MutableRefObject } from 'react'
// components
import { ArwFlex, ArwSpinner } from '@/components/arw'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Navigation from '@/components/shared/Navigation'
// lib
import { IImage } from '@/lib/models/image.model'
import { debug } from '@/lib/utils/dev'
import { When } from 'react-if'

export default function ImageDialog({
	isOpen,
	images,
	selectedIndex,
	handleClose,
	handlePrev,
	handleNext,
}: {
	isOpen: boolean
	images: IImage[]
	selectedIndex: number
	handleClose: () => void
	handlePrev: () => void
	handleNext: () => void
}) {
	debug(8)
	const image = images[selectedIndex]
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	const timerRef = useRef<any>(undefined)

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setIsImageLoaded(false)
		}, 500)

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [selectedIndex, setIsImageLoaded])

	const handleImageLoad = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
		}
		setIsImageLoaded(true)
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="flex-center w-full h-full p-0 bg-transparent dark:bg-transparent close-button-hidden">
				<div className="w-full h-full md:w-full-4 flex-center">
					<div onClick={handleClose} className="absolute inset-0 z-20" />
					<div className="relative flex-center md:rounded-lg overflow-hidden">
						<Navigation
							prev={handlePrev}
							next={handleNext}
							close={handleClose}
							classNamePrev="absolute top-[50%] translate-y-[-50%] p-1 z-50 left-2 text-white drop-shadow-lg"
							classNameNext="absolute top-[50%] translate-y-[-50%] p-1 z-50 right-2 text-white drop-shadow-lg"
							classNameClose="absolute top-2 right-2 z-50 text-white drop-shadow-lg"
							listenersKey
							listenersScroll
							listenersTouch
							size={30}
						/>
						<Image
							src={image?.url}
							alt={image?.name}
							width={1400}
							height={1400}
							onLoad={handleImageLoad}
							className="w-auto h-auto max-h-screen md:max-h-screen-4 object-cover"
							priority
						/>
						<When condition={!isImageLoaded}>
							<ArwFlex className="absolute left-6 top-6">
								<ArwSpinner className="absolute h-8 w-8" />
							</ArwFlex>
						</When>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
