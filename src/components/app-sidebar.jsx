import {
  AudioWaveform,
  BookOpen,
  Bot,
  CloudUpload,
  Command,
  Frame,
  GalleryVerticalEnd,
  List,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Mern 2404",
      logo: GalleryVerticalEnd,
      plan: "Pro",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Banner",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Banner",
          icon: CloudUpload,
          url: "createBanner",
        },
        {
          title: "All Banner",
          icon: List,
          url: "bannerlist",
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Create Category",
          icon: CloudUpload,
          url: "createCategory",
        },
        {
          title: "All Category",
          icon: List,
          url: "categorylist",
        },
      ],
    },
    {
      title: "Sub Category",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Create subCategory",
          icon: CloudUpload,
          url: "createSubcategory",
        },
        {
          title: " All subCategory",
          icon: List,
          url: "subcategorylist",
        },
      ],
    },
    {
      title: "Brand",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Create Brand",
          icon: CloudUpload,
          url: "createBrand",
        },
        {
          title: " All Brand",
          icon: List,
          url: "brandlist",
        },
      ],
    },
    {
      title: "Product",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Create Product",
          icon: CloudUpload,
          url: "createProduct",
        },
        {
          title: " All Product",
          icon: List,
          url: "productlist",
        },
      ],
    },
    {
      title: "Variant",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Create Variant",
          icon: CloudUpload,
          url: "createVariant",
        },
        {
          title: " All Variant",
          icon: List,
          url: "variantlist",
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

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
