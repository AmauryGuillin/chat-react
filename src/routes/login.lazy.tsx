import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link, createLazyFileRoute, useRouter } from "@tanstack/react-router"
import { authenticationAPI } from "@/api/authentication"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { FormEvent } from "react"

export const Route = createLazyFileRoute("/login")({
  component: Login,
})

function Login() {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (formData: FormData) => authenticationAPI(formData),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token.token)
      localStorage.setItem("userID", data.userID)
      localStorage.setItem("AuthUsername", data.username)
      router.history.push("/")
    },
  })

  function handleLogin(event: FormEvent) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    mutation.mutate(formData)
  }

  return (
    <form className="mt-10 flex items-center justify-center" onSubmit={handleLogin}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              autoComplete="off"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="grid">
          <Button className="w-full" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : (
              "Log in"
            )}
          </Button>
          <div className="mt-4 text-center text-sm">
            Does not have an account?&nbsp;
            <Link to="/register" className="underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
