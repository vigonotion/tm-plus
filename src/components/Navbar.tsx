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
    <NavigationMenu className="mb-8">
      <NavigationMenuList>
        <NavigationMenuItem className="flex gap-2 font-head mx-4 uppercase items-center">
          <Circle className="text-orange-500" />
          <span className="mt-[3px]">Terraforming Marsᐩ</span>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Stats
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Explore data
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
