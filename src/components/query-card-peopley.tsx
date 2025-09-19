
import { useForm } from "react-hook-form";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { PeopleyListSchema } from "@/lib/validation/validation";
import z from "zod";



export function QueryCardPeopley() {
    const form = useForm<z.infer<typeof PeopleyListSchema>>({
        resolver: zodResolver(PeopleyListSchema),
    })
    return (
        <Card>
            <CardContent className="flex ">
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="Name">Email</Label>
                    <Input id="Name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="EmpID">Employee ID</Label>
                    <Input id="EmpID" />
                </div>
            </CardContent>
        </Card>
    )
}