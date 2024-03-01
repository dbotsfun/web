import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginButton from "./login-button";

export default function LoginScreen() {
    return <div className="flex flex-col h-[70vh] justify-center">
        <Card className="w-1/3 mx-auto">
            <CardHeader>
                <CardTitle>Unauthorized</CardTitle>
                Please login to keep browsing this area.
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-2 w-full">
                    <LoginButton className="w-full">
                        Login with Discord
                    </LoginButton>
                    <Button className="w-full" variant={"secondary"}>Return to home</Button>
                </div>
            </CardContent>
        </Card>
    </div>
}