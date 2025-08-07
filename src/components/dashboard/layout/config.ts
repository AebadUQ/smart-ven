import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';


export interface LayoutConfig {
  navItems: NavItemConfig[];
}

export const layoutConfig = {
  navItems: [
    
    
    {
      key: 'dashboard',
      items: [
        { key: 'dashboard', title: 'Overview', href: paths.dashboard.overview, icon: 'house' },
      ],
    },
     {
      key: 'tracking',
      items: [
        { key: 'tracking', title: 'Live Tracking', href: paths.dashboard.tracking, icon: 'house' },
      ],
    },
       {
      key: 'student',
      items: [
        { key: 'student', title: 'Student Management', href: paths.dashboard.student, icon: 'house' },
      ],
    },
       {
      key: 'van-driver',
      items: [
        { key: 'van-driver', title: 'Van & Driver Management', href: paths.dashboard.tracking.tracking, icon: 'house' },
      ],
    },
     {
      key: 'parent',
      items: [
        { key: 'parent', title: 'Parent Management', href: paths.dashboard.parents.parents, icon: 'house' },
      ],
    },
     {
      key: 'route-planner',
      items: [
        { key: 'route-planner', title: 'Route Planner', href: paths.dashboard.tracking.stat, icon: 'house' },
      ],
    },
     {
      key: 'alert',
      items: [
        { key: 'dashboard', title: 'Alerts Overview', href: paths.dashboard.settings.auditlogs, icon: 'gear' },
      ],
    },
     {
      key: 'report',
      items: [
        { key: 'dashboard', title: 'Reports', href: paths.dashboard.settings.users, icon: 'house' },
      ],
    },
     {
      key: 'setting',
      items: [
        { key: 'setting', title: 'Settings', href: paths.dashboard.settings.users, icon: 'gear' },
      ],
    },
    // {
    //   key: 'sudashboard',
    //   items: [
    //     { key: 'sudashboard', title: 'Super Admin Dashboard', href: paths.dashboard.sudashboard, icon: 'house' },
    //   ],
    // },
    // {
    //   key: 'student',
    //   items: [
    //     { key: 'student', title: 'Student', href: paths.dashboard.student, icon: 'file' },
    //   ],
    // },
    
    //  {
    //   key: 'parents',
    //   items: [
    //     {
    //       key: 'parents',
    //       title: 'Parents',
    //       icon: 'user',
    //        items: [
    //                             { key: 'parents', title: 'Parents', href: paths.dashboard.parents.parents, icon: 'file' },

    //                 { key: 'parents', title: 'Tickets', href: paths.dashboard.parents.ticket, icon: 'file' },

         
    //       ],
    //     },  
       
    //   ],
    // },
    
    // {
    //   key: 'logistics',
    //   items: [
    //     {
    //       key: 'logistics',
    //       title: 'Tracking',
    //       icon: 'truck',
    //        items: [
    //          { key: 'tracking:fleet', title: 'Tracking', href: paths.dashboard.tracking.tracking },
    //          { key: 'tracking:metrics', title: 'Tracking Stats', href: paths.dashboard.tracking.stats },
    //          { key: 'tracking:driver', title: 'Drivers', href: paths.dashboard.tracking.driver },
    //          { key: 'tracking:vehicles', title: 'Vehicles', href: paths.dashboard.tracking.vehicles },

    //       ],
    //     },  
       
    //   ],
    // },

    // {
    //   key: 'reports',
    //   items: [
    //     { key: 'reports', title: 'Reports', href: paths.dashboard.reports, icon: 'file' },
    //   ],
    // },
    // {
    //   key: 'offers',
    //   items: [
    //     {
    //       key: 'offers',
    //       title: 'Offers',
    //       icon: 'seal-percent',
    //       items: [
    //         { key: 'offers', title: 'Offers', href: paths.dashboard.offer },
    //         { key: 'offers:merchant', title: 'Merchant', href: paths.dashboard.merchant },
    //       ],
    //     },  
    //     {
    //       key: 'marketing',
    //       title: 'Marketing',
    //       icon: 'speaker-high',
    //       items: [
    //         { key: 'marketing:campaigns', title: 'Campaigns', href: paths.dashboard.marketing.campaign },
    //         { key: 'marketing:contacts', title: 'Contacts', href: paths.dashboard.marketing.contact },
    //         { key: 'marketing:lists', title: 'Lists', href: paths.dashboard.marketing.list },

    //       ],
    //     },
    //   ],
    // },
    // {
    //   key: 'call-center',
    //   items: [
        
    //     {
    //       key: 'PhoneCall',
    //       title: 'call-center',
    //       icon: 'PhoneCall',
    //       href: paths.dashboard.callCenter
    //     },
        
    //   ],
    // },
    
    // {
    //   key: 'careers',
    //   items: [
        
    //     {
    //       key: 'careers:log',
    //       title: 'Careers',
    //       icon: 'BriefcaseIcon',
    //       items: [
    //     { key: 'careers', title: 'Careers Dashboard', href: paths.dashboard.jobs.dashboard },
    //     { key: 'jobs', title: 'Jobs', href: paths.dashboard.jobs.browse },
    //     { key: 'applicants', title: 'Applicants', href: paths.dashboard.jobs.candidates },
    //     { key: 'general-applicants', title: 'General Applicants', href: paths.dashboard.jobs.generalCandidates },
    //     { key: 'configuration', title: 'Configuration', href: paths.dashboard.jobs.configuration },
    //   ],
    //     },
        
    //   ],
    // },
     
    // {
    //   key: 'settings',
    //   items: [
        
    //     {
    //       key: 'settings',
    //       title: 'Settings',
    //       icon: 'gear',
    //       items: [
    //         { key: 'settings:users ', title: 'Users', href: paths.dashboard.settings.users },
    //         { key: 'settings:roles', title: 'User Roles', href: paths.dashboard.settings.userrolls },
    //         { key: 'settings:logs', title: 'Audit Logs', href: paths.dashboard.settings.auditlogs },
    //         { key: 'settings:support', title: 'Support', href: paths.dashboard.settings.support },
            
    //                     // { key: 'settings:priority', title: 'Priority', href: paths.dashboard.settings.priority },

            

    //       ],
    //     },
        
    //   ],
    // },
  ],
} satisfies LayoutConfig;