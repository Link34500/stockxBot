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
    <div className="bg-green-500/10 p-5 w-full rounded-2xl border-2 border-green-500/60">
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap">
          {navLinks.map((navLink, idx) => (
            <NavigationMenuLink asChild key={idx}>
              <Link href={navLink.href}>{navLink.label}</Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
