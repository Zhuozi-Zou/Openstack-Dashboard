exports.host = '10.199.32.243'

exports.admin = {
  name: 'admin',
  password: 'wwwwww'
}

exports.apiAccess = {
  network: 'http://10.199.32.243:9696/v2.0',
  compute: 'http://10.199.32.243:8774/v2.1/fe34e3dd67214a798c1f81809a204b17',
  image: 'http://10.199.32.243:9292/v2'
}

exports.rules = {
  admin: {
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
  },
  user: {
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
      admin: false,
      admin_overview: false,
      login: true,
      error_404: true
    },
    component: {}
  }
}
