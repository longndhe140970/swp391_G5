export const DEFINE_ROUTES_ADMIN = {
  ADMIN_INFORMATION: "/admin/information",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_EMPLOYEE: "/admin/employee/list"
}

export const MenuAdmin = [
  {
    title: "Thông tin",
    path: DEFINE_ROUTES_ADMIN.ADMIN_INFORMATION,
    activePath: "/admin/information",
  },
  {
    title: "Dashboard",
    path: DEFINE_ROUTES_ADMIN.ADMIN_DASHBOARD,
    activePath: "/admin/dashboard"
  },
  {
    title: "Nhân viên",
    path: DEFINE_ROUTES_ADMIN.ADMIN_EMPLOYEE,
    activePath: "/admin/employee/list"
  },
]