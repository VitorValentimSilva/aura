import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

function Switch({
  className,
  size = "default",
  icon,
  checkedIcon,
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
  icon?: ReactNode;
  checkedIcon?: ReactNode;
}) {
  const hasIcons = Boolean(icon || checkedIcon);

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none relative flex items-center justify-center rounded-full bg-background ring-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      >
        {hasIcons && (
          <>
            <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-checked/switch:scale-0 group-data-checked/switch:-rotate-90 group-data-checked/switch:opacity-0 [&_svg]:size-2.5">
              {icon}
            </span>

            <span className="absolute inset-0 flex scale-0 rotate-90 items-center justify-center opacity-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-checked/switch:scale-100 group-data-checked/switch:rotate-0 group-data-checked/switch:opacity-100 [&_svg]:size-2.5">
              {checkedIcon}
            </span>
          </>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { Switch };
