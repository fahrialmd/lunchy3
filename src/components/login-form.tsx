"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/validation/validation";
import z from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isLoading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			userEmpID: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof LoginSchema>) {
		setLoading(true);
		try {
			const result = await signIn("credentials", {
				userEmpID: data.userEmpID,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				toast.error("Login Failed", {
					description: "Invalid Employee ID or password. Please try again.",
				});
				setLoading(false);
				return;
			}

			if (result?.ok) {
				toast.success("Login Successful!", {
					description: "Welcome back! Redirecting to dashboard...",
				});

				// Redirect to dashboard or desired page
				router.push("/dashboard");
			}
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Login Failed", {
				description: "Something went wrong. Please try again.",
			});
			setLoading(false);
		}
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="p-6 md:p-8 space-y-8"
						>
							<div className="flex flex-col items-center text-center">
								<h1 className="text-2xl font-bold">Welcome back</h1>
								<p className="text-muted-foreground text-balance">
									Login to your Lunchy3 account
								</p>
							</div>
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
									</FormItem>
								)}
							/>
							<div className="flex flex-col gap-3">
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? "Loading..." : "Sign In"}
								</Button>
							</div>
							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<a href="/register" className="underline underline-offset-4">
									Sign up
								</a>
							</div>
						</form>
					</Form>
					<div className="bg-muted relative hidden md:block">
						{/* <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            /> */}
					</div>
				</CardContent>
			</Card>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
