"use client"

import { categoryFilters } from '@/constants'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

function Categories() {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const selectedCategory = searchParams.get("category")

    function handleTags(key, value) {
        const params = new URLSearchParams(searchParams)
        params.set(key, value)

        router.push(pathName + "?" + params.toString())
    }

    return (
        <div className="flexBetween w-full gap-5 flex-wrap">
            <ul className="flex gap-2 overflow-auto">
                {categoryFilters.map((category) => (
                    <Button key={category} variant="ghost" className={`${category === selectedCategory ? "bg-light-white-300 font-medium" : "font-normal"} px-4 py-3 rounded-lg capitalize whitespace-nowrap`} onClick={() => handleTags("category", category)} >
                        {category}
                    </Button>
                ))}
            </ul>
        </div>
    )
}

export default Categories