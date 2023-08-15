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

export function Navbar() {
  return (
    <>
      <NavigationMenu className="fixed">
        <NavigationMenuList>
          <NavigationMenuItem className="flex gap-2 font-head mx-4 uppercase items-center">
            <Circle className="text-orange-500" />
            <span className="mt-[3px]">Terraforming Marsᐩ</span>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink active className={navigationMenuTriggerStyle()}>
              Recent games
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="pointer-events-none opacity-40">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Explore data
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <span className="h-24 inline-block"></span>
    </>
  );
}
