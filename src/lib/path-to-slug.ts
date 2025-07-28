// lib/path-to-slug.ts
export function getModuleSlugFromPath(pathname: string): string | null {
  // look for the longest matching prefix
  const mapping: Record<string, string> = {
    '/dashboard':   'dashboard',
    '/form':        'forms',
    '/leads':       'leads',
        '/student':       'student',
'/reports':"reports",
    '/offers':      'offers',
    '/merchants':   'offers',
    '/marketing':   'marketing',
    '/call-center': 'call-center',
    '/meet': 'call-center',
    '/settings':    'settings',
    '/marketing/campaigns':    'marketing',
    '/marketing/contacts' :    'marketing',
    '/marketing/lists':        'marketing',
    '/settings/audit-logs':   'settings',
    '/settings/user-roles':   'settings',
    '/settings/support':      'settings',
    '/settings/users':        'settings',
    '/careers':        'careers',
    '/careers/jobs':        'careers',
    '/careers/create':        'careers',
    '/careers/candidates':        'careers',
    '/careers/general':        'careers',
    '/careers/configuration':        'careers',
    

    
  }

  // find the first key that matches the start of the pathname
  for (const [routePrefix, slug] of Object.entries(mapping)) {
    // console.log("ye kia he ",routePrefix, slug);
    if (pathname.startsWith(routePrefix)) {

      return slug
    }
  }

  return null
}
