"use client"
import Loading from '@/components/common/loading'
import SearchList from '@/components/search/SearchList'
import React, { Suspense } from 'react'

const Search = () => {
  
  return (
    <Suspense fallback={<Loading />}>
      <SearchList />
    </Suspense>
  )
}

export default Search