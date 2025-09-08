"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AvatarSelector } from "./avatar-selector";

const FormSchema = z
	.object({
		userName: z.string().min(1, {
			message: "Full name is required",
		}),
		userEmpID: z.string().length(5, {
			message: "Employee ID must be exactly 5 characters.",
		}),
		password: z.string().min(6, {
			message: "Password must be at least 6 characters.",
		}),
		avatar: z.string().min(1, {
			message: "Avatar is required.",
		}),
		confirmPassword: z.string().min(6, {
			message: "Please confirm your password.",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isLoading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			userName: "",
			userEmpID: "",
			avatar: "",
			password: "",
			confirmPassword: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		setLoading(true);
		toast("You submitted the following values", {
			description: (
				<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Create Account</CardTitle>
					<CardDescription>
						Enter your employee details to create Lunchy3 account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="userName"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>Full Name</FormLabel>
											<FormMessage />
										</div>
										<FormControl>
											<Input {...field} disabled={isLoading} />
										</FormControl>
										<FormDescription>Enter your full name.</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="avatar"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>Profile Picture</FormLabel>
											<FormMessage />
										</div>
										<FormControl>
											<AvatarSelector
												value={field.value}
												onChange={field.onChange}
												disabled={isLoading}
											/>
										</FormControl>
										<FormDescription>
											Choose a profile picture for your account.
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="userEmpID"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>Employee ID</FormLabel>
											<FormMessage />
										</div>
										<FormControl>
											<Input
												{...field}
												onChange={(e) =>
													field.onChange(e.target.value.toUpperCase())
												}
												maxLength={5}
												disabled={isLoading}
											/>
										</FormControl>
										<FormDescription>
											Your unique 5-character employee identifier (e.g., EMP01).
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>Password</FormLabel>
											<FormMessage />
										</div>
										<FormControl>
											<Input type="password" {...field} disabled={isLoading} />
										</FormControl>
										<FormDescription>
											Must be at least 6 characters long.
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>Confirm Password</FormLabel>
											<FormMessage />
										</div>
										<FormControl>
											<Input
												type="password"
												placeholder="Confirm your password"
												{...field}
												disabled={isLoading}
											/>
										</FormControl>
										<FormDescription>
											Re-enter your password to confirm.
										</FormDescription>
									</FormItem>
								)}
							/>

							<div className="flex flex-col gap-3">
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? "Creating Account..." : "Create Account"}
								</Button>
							</div>
						</form>
					</Form>

					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<a href="/login" className="underline underline-offset-4">
							Sign in
						</a>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
