export const login = () => {
  return {
    token: 'xxx'
  }
}

export const authorization = () => {
  return {
    rules: {
      page: {
        index: true,
        home: true,
        project: true,
        network: true,
        networks: true,
        routers: true,
        security_groups: true,
        floating_ips: true,
        compute: true,
        instances: true,
        images: true,
        key_pairs: true,
        admin: true,
        admin_overview: true,
        login: true,
        error_404: true
      },
      component: {}
    }
  }
}
