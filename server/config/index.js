exports.host = '10.199.32.243'

exports.admin = {
  name: 'admin',
  password: 'wwwwww'
}

exports.apiAccess = {
  network: 'http://10.199.32.243:9696/v2.0',
  compute: 'http://10.199.32.243:8774/v2.1',
  image: 'http://10.199.32.243:9292/v2'
}

exports.rules = {
  admin: {
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
      Admin_Overview: true,
      Login: true,
      Error_404: true
    },
    component: {}
  },
  user: {
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
      Admin: false,
      Admin_Overview: false,
      Login: true,
      Error_404: true
    },
    component: {}
  }
}
