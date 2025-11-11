import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";
import type { RootState } from "@/store";

export interface LayoutConfig {
  navItems: NavItemConfig[];
}

// layoutConfig object with a dynamic getter
export const layoutConfig = {
  getNavItems: (state: RootState): NavItemConfig[] => {
    const role = state.auth.user?.role;

    // Superadmin sees only Dashboard
    if (role === "superadmin") {
      return [
        {
          key: "dashboard",
          items: [
            { key: "dashboard", title: "Overview", href: paths.dashboard.sudashboard, icon: "house" },
          ],
        },
         {
          key: "school",
          items: [
            { key: "school", title: "School Management", href: paths.dashboard.superadmin.school, icon: "building" },
          ],
        },
         {
          key: "billing",
          items: [
            { key: "billing", title: "Billing & Subscription", href: paths.dashboard.superadmin.billing, icon: "invoice" },
          ],
        },
          {
        key: "tracking",
        items: [
          { key: "tracking", title: "Live Tracking", href: paths.dashboard.tracking, icon: "truck" },
        ],
      },
      {
        key: "parent",
        items: [
          { key: "parent", title: "Complaint Management", href: paths.dashboard.parents.parents, icon: "file" },
        ],
      },
      ];
    }

    // Full menu for other users
    return [
      {
        key: "dashboard",
        items: [
          { key: "dashboard", title: "Overview", href: paths.dashboard.overview, icon: "house" },
        ],
      },
      {
        key: "tracking",
        items: [
          { key: "tracking", title: "Live Tracking", href: paths.dashboard.tracking, icon: "truck" },
        ],
      },
      {
        key: "student",
        items: [
          { key: "student", title: "Student Management", href: paths.dashboard.student, icon: "users" },
        ],
      },
      {
        key: "van",
        items: [
          { key: "van", title: "Van Management", href: paths.dashboard.van, icon: "van" },
        ],
      },
      {
        key: "parent",
        items: [
          { key: "parent", title: "Complaint Management", href: paths.dashboard.parents.parents, icon: "file" },
        ],
      },
      {
        key: "route-planner",
        items: [
          { key: "route-planner", title: "Route Planner", href: paths.dashboard.planner, icon: "path" },
        ],
      },
      {
        key: "alert",
        items: [
          { key: "alert", title: "Alert", href: paths.dashboard.alert, icon: "warning" },
        ],
      },
    ];
  },
} satisfies LayoutConfig & { getNavItems: (state: RootState) => NavItemConfig[] };
