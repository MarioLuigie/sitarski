// modules
import Image from 'next/image'
import { Else, If, Then } from 'react-if'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
// components
import { ArwFlex, ArwIcon, ArwText } from '@/components/arw'
import { Button } from '@/components/ui/button'
// lib
import { icons } from '@/lib/constants/paths'

export default function Uploader({
	files,
	setFiles,
}: {
	files: FileWithPath[]
	// eslint-disable-next-line no-unused-vars
	setFiles: (files: FileWithPath[]) => void
}) {
	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			setFiles(acceptedFiles)
		},
		[setFiles]
	)

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
	})

	return (
		<div
			{...getRootProps()}
			className="w-full h-full cursor-pointer overflow-hidden rounded-md"
		>
			<input {...getInputProps()} className="z-50" />
			<If condition={files.length > 0}>
				<Then>
					<div className="w-full h-full flex flex-wrap justify-center">
						{files.map((file) => {
							let flexBasis = `${100 / files.length}%`
							return (
								<Image
									key={file.path}
									src={URL.createObjectURL(file)}
									alt="image"
									width={100}
									height={100}
									style={{ flex: `1 1 ${flexBasis}`, height: 'auto' }}
									className="object-cover object-center"
								/>
							)
						})}
					</div>
				</Then>
				<Else>
					<div className="h-full flex flex-col justify-between p-3 bg-accent">
						<ArwFlex center className="grow overflow-hidden">
							<ArwIcon src={icons.UPLOAD} size={80} />
						</ArwFlex>
						<ArwFlex center>
							<ArwText className="text-sm">Drag and drop or</ArwText>
							<Button type="button" className="w-full text-sm">
								Select image(s)
							</Button>
						</ArwFlex>
					</div>
				</Else>
			</If>
		</div>
	)
}
