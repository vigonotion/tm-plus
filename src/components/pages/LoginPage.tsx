import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {CorpTable} from "@/CorpRates.tsx";
import React, {useRef} from "react";
import {Content} from "@/components/Content.tsx";
import {Circle} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu.tsx";
import {Link} from "@tanstack/react-router";

export function LoginPage() {

    const iconRef = useRef<SVGSVGElement>(null);

    function triggerFailAnimation() {
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

    return <div className={"flex w-screen h-screen justify-center items-center"}>


        <div className={"max-w-[600px] grow"}>
            <div className={"flex flex-col gap-8"}>
                <div className={"flex justify-center"}><Circle ref={iconRef} className="text-orange-500" size={72} /></div>
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={"flex flex-col gap-4"}>
                            <Input placeholder={"Username"} />
                            <Input placeholder={"Password"} type={"password"}/>
                            <Button variant={"outline"} onClick={triggerFailAnimation}>Login</Button>
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