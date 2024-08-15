/* eslint-disable react/prop-types */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        danger: "bg-danger text-danger-foreground shadow-sm hover:bg-danger/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:border hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3 text-sm",
        lg: "h-10 rounded-full px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, label, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const buttonElement = (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
    return label ? (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
          <TooltipContent
            sideOffset={5}
            side="bottom"
            align="center"
            className="-50 overflow-hidden rounded-md bg-primary-foreground border border-border px-3 py-1.5 text-sm text-primary animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          >
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      buttonElement
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
