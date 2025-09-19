import { SiteHeader } from "@/components/site-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrismaClient } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QueryCardPeopley } from "@/components/query-card-peopley";

const prisma = new PrismaClient();

async function getUsers() {
    return await prisma.user.findMany({
        select: {
            id: true,
            userName: true,
            userEmpID: true,
            avatar: true,
            roles: true,
        }
    });
}

export default async function PeoplePage() {
    const users = await getUsers();

    return (
        <>
            <SiteHeader siteTitle="Lunchy Peopley" />
            <div className="space-y-4 m-6">
                <QueryCardPeopley />
                {users.map((user) => (
                    <Card key={user.id}>
                        <CardContent className="flex">
                            <div>
                                <Avatar>
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <div className="flex">
                                    <CardTitle>{user.userName}</CardTitle>
                                    <div className="flex gap-2">
                                        {user.roles?.map((role) => (
                                            <Badge key={role} variant="secondary">
                                                {role}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <CardDescription>Employee ID: {user.userEmpID}</CardDescription>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}