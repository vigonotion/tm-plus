import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {CorpTable} from "@/CorpRates.tsx";
import React, {useRef, useState} from "react";
import {Content} from "@/components/Content.tsx";
import {Circle} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu.tsx";
import {Link, useNavigate} from "@tanstack/react-router";
import {conn} from "@/conn.ts";
import {Loading} from "@/components/Loading.tsx";

export function LoginPage() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const iconRef = useRef<SVGSVGElement>(null);

    function triggerFailAnimation() {
        setLoading(false);

        if(!iconRef.current) return;

        iconRef.current.animate([
            { transform: "translateX(0px)" },
            { transform: "translateX(-20px)", color: "#ef4444" },
            { transform: "translateX(20px)" },
            { transform: "translateX(0px)" },

        ], {
            duration: 300,
            easing: "ease-out",
        });

        iconRef.current.animate([
            { color: "#ef4444" },
            { color: "#ef4444" },
            { color: "#ef4444" },
            { color: "#ef4444" },
            { color: undefined },
        ], {
            duration: 1500,
            easing: "ease-out",
        });
    }

    const navigate = useNavigate();

    async function login() {
        setLoading(true);
        try {
            await conn.admins.authWithPassword(username, password);
            await navigate({to: "/"});
        }
        catch (e) {
            triggerFailAnimation();
            setPassword("");
        }
    }

    return <div className={"flex w-screen h-screen justify-center items-center"}>


        <div className={"max-w-[600px] grow"}>
            <div className={"flex flex-col gap-8"}>
                <div className={"flex justify-center"}><Circle ref={iconRef} className="text-orange-500" size={72} /></div>
                <Card className={"relative overflow-hidden"}>
                    {loading && <div className={"absolute top-0 left-0 bottom-0 right-0 backdrop-blur backdrop-brightness-75 flex items-center justify-center"}>
                        <Loading />
                    </div>}
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={"flex flex-col gap-4"}>
                            <Input placeholder={"Username"} value={username} onChange={(e) => setUsername(e.target.value)} />
                            <Input placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} type={"password"}/>
                            <Button variant={"outline"} onClick={login}>Login</Button>
                        </div>
                    </CardContent>
                </Card>
                <div className={"text-center text-muted-foreground"}>
                    <Link to="/">
                        « Go back to the main page
                    </Link>
                </div>
            </div>
        </div>

    </div>
}