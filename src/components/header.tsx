import { Github, LogIn, LogOut, Plus, Settings, User, Users } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import useCheckAuth from "@/hooks/useCheckAuth"
import { Link } from "@tanstack/react-router"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const { isConnected, handleLogout } = useCheckAuth()

  return (
    <>
      <div className="flex items-center border-b-2 bg-gray-200 dark:bg-gray-900">
        <div className="flex w-full items-center gap-3 p-2">
          <div className="">
            <Link to="/" className="[&.active]:font-bold">
              <img src="src\assets\images\logo.png" alt="" className="h-12 hover:cursor-pointer" />
            </Link>
          </div>
          <Button>
            <Link to="/general-chat" className="">
              General
            </Link>
          </Button>
          <Button>
            <Link to="/private-messages" className="">
              Private Messages
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-5 pr-5">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Profile</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {isConnected && (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>General Chanel</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Create Conversation</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  </>
                )}
                {!isConnected && (
                  <>
                    <Link to="/login" className="">
                      <DropdownMenuItem>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/register" className="">
                      <DropdownMenuItem>
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Register</span>
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
                {isConnected && (
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <a href="https://github.com/AmauryGuillin" target="_blank">
                  <DropdownMenuItem>
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  )
}
