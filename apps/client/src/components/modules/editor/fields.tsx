'use client'

import { Media } from 'anilist'
import Image from 'next/image'

interface EditorFieldProps {
	fields: Pick<Media, 'id' | 'title' | 'studios' | 'staff' | 'tags' | 'source' | 'externalLinks' | 'coverImage'>
}

const EditorFields: React.FC<EditorFieldProps> = ({ fields }) => {
	return <></>
}

export default EditorFields
