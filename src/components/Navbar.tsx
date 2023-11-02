import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Circle } from "lucide-react";
import { Link, useRouter, useNavigate } from "@tanstack/react-router";
import { cn } from "@/utils";

export function Navbar() {
  const router = useRouter();

  return (
    <>
      <NavigationMenu className="md:fixed">
        <NavigationMenuList>
          <NavigationMenuItem className="flex gap-2 font-head mx-4 uppercase items-center">
            <Circle className="text-orange-500" />
            <span className="mt-[3px]">Terraforming Marsᐩ</span>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/" className={navigationMenuTriggerStyle()}>
              Games
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/players" className={navigationMenuTriggerStyle()}>
              Players
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/corporations" className={navigationMenuTriggerStyle()}>
              Corporations
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        ""
                      )}
                      to="/elo-sim"
                    >
                      <div className="text-sm font-medium leading-none">
                        Elo simulator
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Try out how the elo algorithm works
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        ""
                      )}
                      to="/mapTool"
                    >
                      <div className="text-sm font-medium leading-none">
                        Map tool
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Generate a map svg from a map state
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/about" className={navigationMenuTriggerStyle()}>
              About
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/login" className={navigationMenuTriggerStyle()}>
              Login
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <span className="md:h-24 inline-block"></span>
    </>
  );
}
