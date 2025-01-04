import { ModeToggle } from "@/components/them-toggle";
import { useStore } from "@/hooks/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Navbar({ h1, h3 }: { h1: string; h3: string }) {
  const { user } = useStore((state) => state.user);

  return (
    <header>
      <nav className="header flex justify-between w-full mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-primary mb-2">{h1}</h1>
          <h3>{h3}</h3>
        </div>
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-primary-foreground rounded-md select-none">
              <div className="flex p-1.5  px-3 gap-3 justify-start items-center ">
                <img
                  src={user?.avatar}
                  alt="Profile"
                  width="30"
                  className="rounded-full"
                />
                <span className="text-sm">{user?.name}</span>
                <ChevronDown size={20} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
