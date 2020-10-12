const host = '10.199.32.243'
const adminProjectId = 'fe34e3dd67214a798c1f81809a204b17'

exports.host = host

exports.admin = {
  name: 'admin',
  password: 'wwwwww'
}

exports.apiAccess = {
  network: `http://${host}:9696/v2.0`,
  compute: `http://${host}:8774/v2.1/${adminProjectId}`,
  image: `http://${host}:9292/v2`
}

exports.rules = {
  admin: {
    page: {
      index: true,
      home: true,
      project: true,
      network: true,
      network_topology: true,
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
      network_topology: true,
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
