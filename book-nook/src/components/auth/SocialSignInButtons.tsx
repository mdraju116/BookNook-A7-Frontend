"use client"

import * as React from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { signIn } from "@/lib/auth-client"
import { useState } from "react";

type SocialProvider = "google" | "github"

const providers: Array<{
  provider: SocialProvider
  label: string
  icon: React.ReactNode
}> = [
  {
    provider: "google",
    label: "Continue with Google",
    icon: <FcGoogle className="size-4" aria-hidden="true" />,
  },
  {
    provider: "github",
    label: "Continue with GitHub",
    icon: <FaGithub className="size-4" aria-hidden="true" />,
  },
]

export function SocialSignInButtons() {
  const [pendingProvider, setPendingProvider] =
   useState<SocialProvider | null>(null)

  const handleSocialSignIn = async (provider: SocialProvider) => {
    if (pendingProvider) return

    setPendingProvider(provider)

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      })

      if (error) {
        toast.error(error.message || `Could not sign in with ${provider}.`)
      }
    } catch (error) {
      console.error(`${provider} sign-in error:`, error)
      toast.error(`Something went wrong with ${provider}. Please try again.`)
    } finally {
      setPendingProvider(null)
    }
  }

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {providers.map(({ provider, label, icon }) => (
        <Button
          key={provider}
          type="button"
          variant="outline"
          className="w-full"
          disabled={pendingProvider !== null}
          onClick={() => handleSocialSignIn(provider)}
        >
          {pendingProvider === provider ? <Spinner className="size-4" label={`${label} loading`} /> : icon}
          {pendingProvider === provider ? "Connecting..." : label}
        </Button>
      ))}
    </div>
  )
}
