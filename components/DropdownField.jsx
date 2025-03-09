"use client"

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

function DropDownField({ title, state, filters, setState }) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(state)

    return (
        <div className="flex flex-col w-full justify-start items-start gap-4 relative">
            <label htmlFor='title' className='w-full text-gray-100'>
                {title}
            </label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] p-6 justify-between bg-light-white-100">
                        {value
                            ? filters.find((filter) => filter === value)
                            : "Select category..."}
                        <Image src='/arrow-down.svg' alt='down-arrow' height={5} width={10} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 bg-light-white-100">
                    <Command>
                        <CommandInput placeholder="Search category..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No category found</CommandEmpty>
                            <CommandGroup>
                                {filters.map((filter) => (
                                    <CommandItem key={filter} value={filter} onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setState(currentValue)
                                            setOpen(false)
                                        }}>
                                        {filter}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DropDownField