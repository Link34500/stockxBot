import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

interface NavLink {
  label: React.ReactNode;
  href: string;
}

interface NavbarProps {
  navLinks: NavLink[];
}

export function Navbar({ navLinks }: NavbarProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        {navLinks.map((navLink, idx) => (
          <>
            <NavigationMenuTrigger>
              <NavigationMenuLink href={navLink.href}>
                {navLink.label}
              </NavigationMenuLink>
            </NavigationMenuTrigger>
            <NavigationMenuItem></NavigationMenuItem>
          </>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
