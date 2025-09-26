// src/components/ui/input.tsx
import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
	'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 w-full min-w-0 rounded-md transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'border-input h-9 bg-transparent px-3 py-1 text-base shadow-xs border md:text-sm',
				port_i: 'h-[3.2rem] border-none bg-[#F2F2F2] text-[1.4rem] placeholder:text-placeholder px-[1.6rem] rounded-[0.8rem] focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 font-bold placeholder:font-medium',
				etc_setting:
					'border-none placeholder:text-[#9F9F9F] text-17 font-bold focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0',
			},
		},
		defaultVariants: {
			variant: 'port_i',
		},
	},
);

export interface InputProps extends React.ComponentProps<'input'>, VariantProps<typeof inputVariants> {}

const Input = ({ className, type, variant, ...props }: InputProps) => {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				inputVariants({ variant }),
				className,
			)}
			{...props}
		/>
	);
};

export { Input };
