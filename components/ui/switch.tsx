"use client"

import { IoMoonOutline } from "react-icons/io5"
import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { useThemeStore } from "@/app/stateManager/theme"
import { cn } from "@/lib/utils"
import next from "next"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {

  const { secondBgClass, secondBgClassOpposite, NextBg, navbarText } = useThemeStore()

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        `
          peer
          ${secondBgClassOpposite}
          inline-flex
          items-center
          h-[2.2rem]
          cursor-pointer
          w-16
          rounded-full
          border border-transparent
          shadow-xs
          transition-all
          outline-none
          px-1
          relative
          disabled:cursor-not-allowed
          disabled:opacity-50
        `,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          `
            ${NextBg}
            pointer-events-none
            flex
            items-center
            justify-center
            size-7
            rounded-full
            ring-0
            transition-transform
            absolute
            left-1
            data-[state=checked]:translate-x-7
            data-[state=unchecked]:translate-x-0
          `
        )}
      >
        <IoMoonOutline className={`text-[16px] ${navbarText}`} />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
