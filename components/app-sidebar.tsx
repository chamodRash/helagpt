"use client";

import * as React from "react";
import {
  Code2,
  Frame,
  ImageIcon,
  Map,
  Mic,
  PieChart,
  Text,
  Video,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { createClient } from "@/utils/supabase/client";

import { type Session } from "@supabase/supabase-js";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Text Generation",
      url: "/dashboard/chat",
      icon: Text,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Image Generation",
      url: "/dashboard/image",
      icon: ImageIcon,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Video Generation",
      url: "/dashboard/video",
      icon: Video,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Audio Generation",
      url: "/dashboard/audio",
      icon: Mic,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Code Generation",
      url: "/dashboard/code",
      icon: Code2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [session, setSession] = React.useState<Session | null>(null);
  const [avatarurl, setAvatarUrl] = React.useState<string | null>(null);
  const supabase = createClient();

  // Ensure theme is loaded before rendering (to prevent hydration mismatch)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // useCallback to memoize the function
  const fetchSession = React.useCallback(async () => {
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error fetching session:", sessionError.message);
      return;
    }
    setSession(session.session);

    // Fetch the avatar_url
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", session?.session?.user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError.message);
      return;
    }

    const { data, error } = await supabase.storage
      .from("avatars")
      .download(profile?.avatar_url);
    if (error) {
      throw error;
    }

    const url = URL.createObjectURL(data);
    setAvatarUrl(url);

    console.log("Avatar URL:", url);
  }, [supabase]); // Include 'supabase' in the dependency array

  React.useEffect(() => {
    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchSession, supabase.auth]); // Add fetchSession and supabase.auth as dependencies

  if (!mounted) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="mt-3 ml-3">
          {theme === "light" && (
            <Image
              src="/logo/helagpt_text_right_logo.png"
              alt="HelaGPT logo"
              width={150}
              height={50}
              className="cursor-pointer"
              priority
            />
          )}
          {theme === "dark" && (
            <Image
              src="/logo/helagpt_text_right_dark.png"
              alt="HelaGPT logo"
              width={150}
              height={50}
              className="cursor-pointer"
              priority
            />
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session?.user?.user_metadata.full_name,
            email: session?.user.email,
            avatar: avatarurl as string,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
