"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { changePassword, signOut, updateUser, useSession } from "@/lib/auth-client"
import { getClientToken } from "@/lib/access-jwt-at-client-component"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-hot-toast"
import { FaUser } from "react-icons/fa"
import { BookPlus, BookOpen, KeyRound, LogOut, Pencil, Save, X } from "lucide-react"
import MotionWrapper from "@/components/MotionWrapper";

const ProfileInfoPage = () => {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [booksAdded, setBooksAdded] = useState(0)
  const [activeBorrows, setActiveBorrows] = useState(0)
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [statsError, setStatsError] = useState(false)
  const user = session?.user
  const userId = user?.id

  useEffect(() => {
    if (isPending || !userId) return

    let isCurrent = true

    async function loadStats() {
      setIsLoadingStats(true)
      setStatsError(false)

      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "")
        if (!baseUrl) throw new Error("The book server is not configured.")

        const jwtToken = await getClientToken()
        if (!jwtToken) throw new Error("Could not verify your session. Please sign in again.")

        const headers = { Authorization: `Bearer ${jwtToken}` }
        const [booksResponse, borrowsResponse] = await Promise.all([
          fetch(`${baseUrl}/my-books`, { headers, cache: "no-store" }),
          fetch(`${baseUrl}/borrows`, { headers, cache: "no-store" }),
        ])
        const [booksResult, borrowsResult] = await Promise.all([
          booksResponse.json().catch(() => null),
          borrowsResponse.json().catch(() => null),
        ])

        if (!booksResponse.ok || !borrowsResponse.ok) {
          throw new Error("Could not load your profile statistics.")
        }
        if (!Array.isArray(booksResult) || !Array.isArray(borrowsResult)) {
          throw new Error("The statistics service returned an invalid response.")
        }

        if (isCurrent) {
          setBooksAdded(booksResult.length)
          setActiveBorrows(borrowsResult.length)
        }
      } catch (error) {
        console.error("Profile statistics error:", error)
        if (isCurrent) setStatsError(true)
      } finally {
        if (isCurrent) setIsLoadingStats(false)
      }
    }

    void loadStats()
    return () => {
      isCurrent = false
    }
  }, [isPending, userId])

  // Prefill the profile editor with the user's current details.
  const startEditing = () => {
    setName(user?.name ?? "")
    setImage(user?.image ?? "")
    setIsChangingPassword(false)
    setIsEditing(true)
  }

  // Save profile changes through Better Auth.
  const handleUpdateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSaving) return

    try {
      setIsSaving(true)
      const { error } = await updateUser({ name: name.trim(), image: image.trim() || undefined })
      if (error) {
        toast.error(error.message || "Could not update your profile.")
        return
      }
      toast.success("Profile updated successfully.")
      setIsEditing(false)
    } catch (error) {
      console.error("Profile update error:", error)
      toast.error("Could not update your profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Change the signed-in user's password.
  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSaving) return
    try {
      setIsSaving(true)
      const { error } = await changePassword({ currentPassword, newPassword })
      if (error) {
        toast.error(error.message || "Could not change your password.")
        return
      }
      toast.success("Password changed successfully.")
      setCurrentPassword("")
      setNewPassword("")
      setIsChangingPassword(false)
    } catch (error) {
      console.error("Password change error:", error)
      toast.error("Could not change your password. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Sign out and return to the home page.
  const handleSignOut = async () => {
    if (isSigningOut) return

    try {
      setIsSigningOut(true)
      const { error } = await signOut()
      if (error) {
        toast.error(error.message || "Could not sign out.")
        return
      }
      toast.success("Signed out successfully.")
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Sign-out error:", error)
      toast.error("Could not sign out. Please try again.")
    } finally {
      setIsSigningOut(false)
    }
  }

  // Show a loading state while the session is being checked.
  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
        <header className="mb-8 flex flex-col items-center gap-3">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-72 max-w-full" />
        </header>
        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.5fr]">
          <section className="flex flex-col items-center rounded-3xl border border-[#b7dfc2] bg-[#e5f6e9] p-8">
            <Skeleton className="size-32 rounded-full" />
            <Skeleton className="mt-5 h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-56" />
            <Skeleton className="mt-5 h-10 w-44 rounded-full" />
            <Skeleton className="mt-6 h-10 w-full rounded-lg" />
          </section>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-36 rounded-3xl" />
              <Skeleton className="h-36 rounded-3xl" />
            </div>
            <Skeleton className="h-48 rounded-3xl" />
          </div>
        </div>
      </main>
    )
  }

  // Require a signed-in session to view profile details.
  if (!user) {
    return (
      <div className="flex items-center justify-center px-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">Please sign in to view your profile.</p>
      </div>
    )
  }

  // Show the user's registration month and year.
  const memberSince = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(user.createdAt))

  
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
      {/* Profile page heading */}
      <MotionWrapper>
      <div className="relative mb-10 border-b border-[#e8e5dc] pb-8 text-center">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#193b27] dark:text-white sm:text-4xl">
          My Profile
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#476552] dark:text-white sm:text-base">
          View and manage your account details.
        </p>
      </div>
      </MotionWrapper>

      {/* User details, overview stats, and profile actions */}
      <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.5fr]">
        {/* Profile summary */}
        <section className="rounded-3xl border border-[#b7dfc2] bg-linear-to-br from-[#f4fff7] via-[#e5f6e9] to-[#ccebd6] p-6 shadow-xl shadow-[#068a3f]/10 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex size-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#d9f0df] text-4xl text-[#068a3f] shadow-lg shadow-[#068a3f]/15 sm:size-32 ">
              {user.image ? (
                <Image src={user.image} alt={`${user.name || "User"}'s profile picture`} width={128} height={128} className="h-full w-full object-cover" unoptimized />
              ) : (
                <FaUser aria-hidden="true" />
              )}
            </div>
            <h2 className="wrap-break-word text-2xl font-bold text-[#193b27] ">{user.name || "BookNook reader"}</h2>
            <p className="mt-1 break-all text-sm text-[#476552]">{user.email}</p>
            <p className="mt-5 rounded-full border border-[#b7dfc2] bg-white/70 px-4 py-2 text-sm text-[#476552] ">
              <span className="font-semibold text-[#193b27]">Member since:</span> {memberSince}
            </p>
            <Button type="button" onClick={handleSignOut} disabled={isSigningOut} variant="outline" className="mt-6 w-full border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800">
              {isSigningOut ? <Spinner className="size-4 text-red-700" label="Signing out" /> : <LogOut />} {isSigningOut ? "Signing out..." : "Logout"}
            </Button>
          </div>
        </section>

        <div className="space-y-6">
          {/* Books and borrow overview */}
          <section className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center rounded-3xl border border-[#b7dfc2] bg-white p-5 text-center shadow-lg shadow-[#068a3f]/5 sm:p-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#e5f6e9] text-[#068a3f]"><BookPlus className="size-5" /></div>
              <p className="mt-4 flex h-9 items-center justify-center text-3xl font-bold text-[#193b27]">{isLoadingStats ? <Spinner className="size-7 text-[#068a3f]" label="Loading books added count" /> : statsError ? "—" : booksAdded}</p>
              <p className="mt-1 text-sm text-[#476552]">Books Added</p>
            </div>
            <div className="flex flex-col items-center rounded-3xl border border-[#b7dfc2] bg-white p-5 text-center shadow-lg shadow-[#068a3f]/5 sm:p-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#e5f6e9] text-[#068a3f]"><BookOpen className="size-5" /></div>
              <p className="mt-4 flex h-9 items-center justify-center text-3xl font-bold text-[#193b27]">{isLoadingStats ? <Spinner className="size-7 text-[#068a3f]" label="Loading active borrows count" /> : statsError ? "—" : activeBorrows}</p>
              <p className="mt-1 text-sm text-[#476552] ">Active Borrows</p>
            </div>
          </section>

          {/* Quick actions and their expandable forms */}
          <section className="rounded-3xl border border-[#b7dfc2] bg-white p-6 shadow-xl shadow-[#068a3f]/10 sm:p-8">
            <h2 className="text-xl font-bold text-[#193b27] ">Quick Actions</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button type="button" onClick={() => { setIsChangingPassword(false); startEditing() }} className="justify-start bg-[#068a3f] text-white hover:bg-[#057536]"><Pencil />Update Profile</Button>
              <Link href="/add-book" className="inline-flex h-8 items-center justify-start gap-1.5 rounded-lg border border-[#b7dfc2] px-2.5 text-sm font-medium text-[#068a3f] transition-colors hover:bg-[#f4fff7]"><BookPlus className="size-4" />Add New Book</Link>
              <Button type="button" variant="outline" onClick={() => { setIsEditing(false); setIsChangingPassword((open) => !open) }} className="justify-start border-[#b7dfc2] text-[#068a3f] dark:border-[#b7dfc2] dark:hover:text-black"><KeyRound />Change Password</Button>
              <Link href="/my-borrows" className="inline-flex h-8 items-center justify-start gap-1.5 rounded-lg border border-[#b7dfc2] px-2.5 text-sm font-medium text-[#068a3f] transition-colors hover:bg-[#f4fff7]"><BookOpen className="size-4" />See your borrows</Link>
            </div>

            {/* Profile update form */}
            {isEditing && (
              <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4 border-t border-[#e0eee4] pt-5 text-left">
                <h3 className="font-semibold text-[#193b27] ">Update Profile</h3>
                <label className="block text-sm font-medium text-[#193b27]">
                  Full name
                  <input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" className="mt-1.5 h-10 w-full rounded-lg border border-[#b7cdbd] bg-white px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-[#068a3f]/40 dark:text-black" />
                </label>
                <label className="block text-sm font-medium text-[#193b27]">
                  Profile image URL
                  <input value={image} onChange={(event) => setImage(event.target.value)} type="url" autoComplete="url" placeholder="https://example.com/photo.jpg" className="mt-1.5 h-10 w-full rounded-lg border border-[#b7cdbd] bg-white px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-[#068a3f]/40 dark:text-black" />
                </label>
                <p className="break-all text-sm text-[#476552]">Email: {user.email}</p>
                <div className="flex gap-3 pt-1">
                  <Button type="submit" disabled={isSaving} className="flex-1 bg-[#068a3f] text-white hover:bg-[#057536]">{isSaving ? <Spinner className="size-4 text-white" label="Saving profile" /> : <Save />}{isSaving ? "Saving..." : "Save changes"}</Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving} className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"><X />Cancel</Button>
                </div>
              </form>
            )}

            {/* Password change form */}
            {isChangingPassword && (
              <form onSubmit={handleChangePassword} className="mt-6 space-y-4 border-t border-[#e0eee4] pt-5">
                <h3 className="font-semibold text-[#193b27] ">Change your password</h3>
                <label className="block text-sm font-medium text-[#193b27] ">Current password<input type="password" required autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#b7cdbd] bg-white px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-[#068a3f]/40 dark:text-black" /></label>
                <label className="block text-sm font-medium text-[#193b27] ">New password<input type="password" required minLength={8} autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#b7cdbd] bg-white px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-[#068a3f]/40 dark:text-black" /></label>
                <div className="flex gap-3">
                  <Button type="submit" disabled={isSaving} className="bg-[#068a3f] text-white hover:bg-[#057536]">{isSaving ? <Spinner className="size-4 text-white" label="Saving password" /> : <Save />}{isSaving ? "Saving..." : "Save password"}</Button>
                  <Button type="button" variant="outline" onClick={() => setIsChangingPassword(false)} disabled={isSaving} className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"><X />Cancel</Button>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>

    </main>
  )
}

export default ProfileInfoPage
