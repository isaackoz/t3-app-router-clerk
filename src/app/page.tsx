"use client";
import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  currentUser,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function Home() {
  const { data: hello, isLoading } = api.post.hello.useQuery({
    text: "from tRPC",
  });

  const { user, isLoaded } = useUser();

  if (isLoading || !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <AnimatePresence>
      <main className="flex min-h-screen w-full flex-col items-center justify-center pt-48">
        <div className="z-10 min-h-[50vh] w-full max-w-4xl px-5 xl:px-0">
          <motion.h1
            className="animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Balancer> T3 Template App</Balancer>
          </motion.h1>
          <motion.p
            className="animate-fade-up mt-6 text-center text-muted-foreground/80 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Balancer>
              This is a boilerplate for a fullstack Next.js app i have done
              implementing different template around the web.
            </Balancer>
          </motion.p>
          <div>
            {user ? (
              <div>
                <p className="animate-fade-up text-muted-foreground/800 mt-6 text-center md:text-xl">
                  Logged in as {user.fullName}
                </p>
                <SignOutButton>Sign out</SignOutButton>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <p className=" mt-6 text-center text-black text-muted-foreground/80  md:text-xl">
                  You are not logged in
                </p>
                <SignInButton>
                  <button className="rounded-full bg-violet-400 p-3 font-bold text-slate-300">
                    Sign in Now
                  </button>
                </SignInButton>
              </div>
            )}
          </div>
          <div className="mt-3 flex flex-col items-center">
            <p className="text-2xl text-black">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>
        </div>
      </main>
    </AnimatePresence>
  );
}

async function CrudShowcase() {
  const { data: latestPost, isLoading } = api.post.getAllPosts.useQuery();

  if (isLoading || !latestPost) {
    return <div>Loading Content...</div>;
  }

  return (
    <div className="w-full max-w-xs">
      {/* Try posting when not logged in. You will see protected procedure gives an UNAUTHORIZED error. 
       Ideally you wouldn't even show the button if the user is not logged in, but this is just a demo to show 
       that tRPC protectedProcedures work.
      */}
      <CreatePost />
      <div className="mt-6 flex flex-col">
        <ul className="space-y-2">
          {latestPost.map((post, index) => (
            <li key={index} className="border border-gray-400">
              <p className="text-sm">
                {`Posted by `}
                <span className="text-blue-400">
                  <Link href={`/u/${post.user_id}`}>{post.email}</Link>
                </span>{" "}
                {`on ${post.createdAt.toLocaleDateString()}`}
              </p>
              <p className="text-xl text-pink-500">{post.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
