import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchPageBySlug } from '../../api/staticPages'
import parse, { domToReact } from 'html-react-parser'
import PageContent from '@components/layout/PageContent'

const StaticPage = () => {
  const { pageSlug } = useParams()

  const applyStylesToHTML = (domNode) => {
    if (domNode.name === 'h2') {
      return <h2 className='text-[28px]'>{domToReact(domNode?.children, domNode)}</h2>
    }
    if (domNode.name === 'p') return <p className='text-base mb-4 font-sans'>{domToReact(domNode?.children, domNode)}</p>
  }

  const { data: page, isFetched } = useQuery({ queryKey: ['getPage', pageSlug], queryFn: () => fetchPageBySlug(pageSlug), suspense: true })
  return <PageContent>{isFetched && parse(page.content, { replace: applyStylesToHTML })}</PageContent>
}

export default StaticPage
