'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const switchVariants = cva(
	'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			size: {
				md: 'h-[1.15rem] w-8',
				port_i: 'h-[2.6rem] w-[5rem] p-[0.3rem] rounded-[5rem] data-[state=unchecked]:bg-[#D1D1D1] shadow-none',
			},
		},
		defaultVariants: {
			size: 'port_i',
		},
	},
);

const thumbVariants = cva(
	'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block rounded-full ring-0 transition-transform data-[state=unchecked]:translate-x-0',
	{
		variants: {
			size: {
				md: 'size-[1.5rem] data-[state=checked]:translate-x-[calc(100%-2px)]',
				port_i: 'size-[2rem] data-[state=checked]:translate-x-[calc(110%)]',
			},
		},
		defaultVariants: {
			size: 'port_i',
		},
	},
);

interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root>, VariantProps<typeof switchVariants> {}

const Switch = ({ className, size, ...props }: SwitchProps) => {
	return (
		<SwitchPrimitive.Root data-slot="switch" className={cn(switchVariants({ size }), className)} {...props}>
			<SwitchPrimitive.Thumb data-slot="switch-thumb" className={cn(thumbVariants({ size }))} />
		</SwitchPrimitive.Root>
	);
};

export { Switch };
