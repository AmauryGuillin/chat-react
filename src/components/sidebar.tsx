import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MoreHorizontal, SquarePen } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Link } from "@tanstack/react-router"
import { Message } from "@/app/data"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isCollapsed: boolean
  links: {
    name: string
    messages: Message[]
    avatar: string
    variant: "grey" | "ghost"
  }[]
  onClick?: () => void
  isMobile: boolean
}

// export function Sidebar({ links, isCollapsed, isMobile }: SidebarProps) {
export function Sidebar({ links, isCollapsed }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group relative flex h-full flex-col gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({links.length})</span>
          </div>

          <div>
            <Link
              to="/"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9")}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              to="/"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9")}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="/"
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-11 w-11 md:h-16 md:w-16",
                      link.variant === "grey" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    )}
                  >
                    <Avatar className="flex items-center justify-center">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>{" "}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              to="/"
              className={cn(
                buttonVariants({ variant: link.variant, size: "xl" }),
                link.variant === "grey" &&
                  "shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start gap-4",
              )}
            >
              <Avatar className="flex items-center justify-center">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="flex max-w-28 flex-col">
                <span>{link.name}</span>
                {link.messages.length > 0 && (
                  <span className="truncate text-xs text-zinc-300 ">
                    {link.messages[link.messages.length - 1].name.split(" ")[0]}:{" "}
                    {link.messages[link.messages.length - 1].message}
                  </span>
                )}
              </div>
            </Link>
          ),
        )}
      </nav>
    </div>
  )
}
