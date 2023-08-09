import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const getCacheKey = (queryKey, language, params) => {
  const [queryName] = queryKey
  const uniqueKey = JSON.stringify({ queryName, language, ...params })
  return uniqueKey
}

function useLanguageQuery({ queryKey, fetchFunction, params = {}, queryOptions = {} }) {
  const { i18n } = useTranslation()
  const queryClient = useQueryClient()

  const handleLanguageChange = (newLanguage) => {
    i18n.changeLanguage(newLanguage)
  }

  // Use useEffect to invalidate the specific query when the language changes
  useEffect(() => {
    const invalidateQuery = () => {
      queryClient.invalidateQueries([queryKey, { language: i18n.language, ...params }])
    }

    invalidateQuery()
  }, [queryClient, queryKey, params, i18n.language])

  const queryResponse = useQuery({
    queryKey: [...queryKey, { language: i18n.language, ...params }],
    queryFn: () => fetchFunction(i18n.language, params),
    cacheTime: 10000,
    cacheKey: (queryKey, { language }) => getCacheKey(queryKey, language, params),
    ...queryOptions // Additional query options like retry, refetchOnMount, etc.
  })

  return { handleLanguageChange, ...queryResponse }
}

export default useLanguageQuery
