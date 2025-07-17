import { LoginForm } from "@/components/login"

export default function LoginPage() {
  return (
    <div className="bg-neutral-950 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
