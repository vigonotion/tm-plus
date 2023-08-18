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
          <NavigationMenuItem>
            <Link to="/elo-sim" className={navigationMenuTriggerStyle()}>
              Elo simulator
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/about" className={navigationMenuTriggerStyle()}>
              About
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <span className="md:h-24 inline-block"></span>
    </>
  );
}
