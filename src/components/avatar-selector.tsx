"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define available avatars
const AVATAR_OPTIONS = [
	{
		id: "avatar1",
		src: "/avatars/ava21.png",
		alt: "Professional Avatar 1",
		fallback: "A1",
	},
	{
		id: "avatar2",
		src: "/avatars/ava22.png",
		alt: "Professional Avatar 2",
		fallback: "A2",
	},
	{
		id: "avatar3",
		src: "/avatars/ava23.png",
		alt: "Professional Avatar 3",
		fallback: "A3",
	},
	{
		id: "avatar4",
		src: "/avatars/ava24.png",
		alt: "Professional Avatar 4",
		fallback: "A4",
	},
	{
		id: "avatar5",
		src: "/avatars/ava25.png",
		alt: "Professional Avatar 5",
		fallback: "A5",
	},
	{
		id: "avatar6",
		src: "/avatars/ava26.png",
		alt: "Professional Avatar 6",
		fallback: "A6",
	},
];

interface AvatarSelectorProps {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
	className?: string;
}

// Avatar Selection Component
export function AvatarSelector({
	value,
	onChange,
	disabled,
	className,
}: AvatarSelectorProps) {
	return (
		<div className={cn("grid grid-cols-6 gap-4", className)}>
			{AVATAR_OPTIONS.map((avatar) => (
				<button
					key={avatar.id}
					type="button"
					onClick={() => onChange(avatar.src)}
					disabled={disabled}
					className={cn(
						"relative p-0 bg-transparent border-none",
						"focus:outline-none",
						"disabled:opacity-50 disabled:cursor-not-allowed",
						"transition-transform hover:scale-105 disabled:hover:scale-100"
					)}
					aria-label={`Select ${avatar.alt}`}
				>
					<Avatar
						className={cn(
							// Base styles
							"w-16 h-16 transition-all duration-200",
							// Selection styles - applied directly to Avatar
							value === avatar.src
								? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white shadow-lg scale-105"
								: "ring-2 ring-gray-200 hover:ring-gray-300 hover:ring-4",
							// Focus styles for accessibility
							"focus-within:ring-4 focus-within:ring-blue-400 focus-within:ring-offset-2",
							// Disabled styles
							disabled && "opacity-50 cursor-not-allowed"
						)}
					>
						<AvatarImage
							src={avatar.src}
							alt={avatar.alt}
							className="object-cover"
						/>
						<AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
							{avatar.fallback}
						</AvatarFallback>
					</Avatar>

					{/* Selection checkmark - positioned relative to button */}
					{value === avatar.src && (
						<div className="absolute -top-3 -left-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10">
							<svg
								className="w-4 h-4 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					)}
				</button>
			))}
		</div>
	);
}
