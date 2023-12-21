import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { HelpCircle } from "lucide-react"

const InfoPopover = PopoverPrimitive.Root

const InfoPopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <PopoverPrimitive.Trigger
      ref={ref}
      className={cn(
        "",
        className
      )}
      {...props}
    >
      <HelpCircle
        size={15}
        strokeWidth={2.2}
        className="fill-foreground/80 stroke-background"
      />
    </PopoverPrimitive.Trigger>
))

InfoPopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName


const InfoPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border border-slate-200 bg-white p-2 leading-tight text-sm font-medium text-slate-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
InfoPopoverContent.displayName = PopoverPrimitive.Content.displayName

export { InfoPopover, InfoPopoverTrigger, InfoPopoverContent }
