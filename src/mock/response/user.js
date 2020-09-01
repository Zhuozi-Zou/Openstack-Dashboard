export const login = () => {
  return {
    token: 'xxx'
  }
}

export const authorization = () => {
  return {
    rules: {
      page: {
        Index: true,
        Home: true,
        Project: true,
        Network: true,
        Networks: true,
        Routers: true,
        Security_Groups: true,
        Floating_Ips: true,
        Compute: true,
        Instances: true,
        Images: true,
        Key_Pairs: true,
        Admin: true,
        Overview: true,
        Login: true,
        Error_404: true
      },
      component: {}
    }
  }
}
