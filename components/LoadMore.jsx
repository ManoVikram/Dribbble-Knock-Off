"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function LoadMore({ hasNextPage, hasPreviousPage, currentPage }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    function handlePagination(newPage) {
        const params = new URLSearchParams(searchParams)
        params.set("page", newPage)
        router.push(`?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="w-full flexCenter gap-5 mt-10">
            {hasPreviousPage && (
                <Button variant="ghost" onClick={() => handlePagination(currentPage - 1)}>
                    <Image src="/left_arrow.svg" alt="left-arrow" width={16} height={16} /> Previous
                </Button>
            )}
            {hasNextPage && (
                <Button variant="ghost" onClick={() => handlePagination(currentPage + 1)}>
                    Next <Image src="/right_arrow.svg" alt="right-arrow" width={16} height={16} />
                </Button>
            )}
        </div>
    )
}

export default LoadMore