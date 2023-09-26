import { useEffect, useRef, useState } from 'react'
import ReadmeA from '../README.mdx'

export const Readme = ({ readme: ReadmeB }: { readme: typeof ReadmeA }) => {
	const ref = useRef<HTMLDivElement>()
	const [toc, setToc] = useState<JSX.Element>()

	useEffect(() => {
		if (!ref.current || toc) return
		setToc(buildTOC(ref.current))
		appendToggle(ref.current)
	}, [ref.current])

	return (
		<>
			{toc}
			<div id='readme' ref={ref}>
				<ReadmeA />
				<ReadmeB />
			</div>
		</>
	)
}

const appendToggle = (div: HTMLDivElement) => {
	const listitems = div.querySelectorAll('li')
	const linkitems = div.querySelectorAll('a')

	listitems.forEach(li => {
		li.addEventListener('click', e => li.classList.toggle('done'))
	})

	linkitems.forEach(a => (a.target = '_blank'))
}

const buildTOC = (div: HTMLDivElement) => {
	const TOC: JSX.Element[] = []
	const allowedTags = ['h1', 'h2', 'h3', 'h4']
	div.childNodes.forEach((cn: HTMLElement, i) => {
		if (!allowedTags.includes(cn.tagName.toLowerCase())) return
		const cnid = cn.tagName + '-' + i
		cn.id = cnid

		TOC.push(
			<a href={`#${cnid}`} key={i} target='_self' className={cn.tagName}>
				{cn.innerText}
			</a>
		)
	})
	return (
		<div id='toc'>
			<h1>Table of contents</h1>
			{TOC}
		</div>
	)
}
