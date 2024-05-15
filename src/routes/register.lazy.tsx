import { Link, createLazyFileRoute, useRouter } from "@tanstack/react-router"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { registerAPI } from "@/api/authentication"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { FormEvent } from "react"

export const Route = createLazyFileRoute("/register")({
  component: LoginForm,
})

export function LoginForm() {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (formData: FormData) => registerAPI(formData),
    onSuccess: () => {
      router.history.push("/login")
    },
  })

  function handleRegister(event: FormEvent) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    mutation.mutate(formData)
  }

  return (
    <form className="pt-5" onSubmit={handleRegister}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input name="username" id="username" placeholder="Max" required autoComplete="off" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?&nbsp;
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
