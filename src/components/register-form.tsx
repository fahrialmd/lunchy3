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
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { RegisterSchema } from "@/lib/validation/validation";

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isLoading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			userName: "",
			userEmpID: "",
			avatar: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: z.infer<typeof RegisterSchema>) {
		setLoading(true);
		try {
			const response = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userName: data.userName,
					userEmpID: data.userEmpID,
					password: data.password,
					confirmPassword: data.confirmPassword,
					avatar: data.avatar,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				// Handle validation error
				toast.error("Registration Failed", {
					description:
						result.error || "Something went wrong. Please try again.",
				});
				return;
			}

			// Success
			toast.success("Account Created Successfully!", {
				description: `Welcome ${result.user.userName}! You can now sign in with your Employee ID.`,
			});

			// Clear form
			form.reset();

			// Redirect to login page after a short delay
			setTimeout(() => {
				router.push("/login");
			}, 500);
		} catch (error) {
			console.error("Registration error:", error);
			toast.error("Registration Failed", {
				description:
					"Network error. Please check your connection and try again.",
			});
		} finally {
			setLoading(false);
		}
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
				<Separator className="" />
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
											Your unique 5-character employee identifier (e.g., 47814).
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
