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

exports.auth = {
  admin: {
    page: {
      Home: true,
      Network: true,
      Networks: true,
      Routers: true,
      Security_Groups: true,
      Floating_Ips: true,
      Compute: true,
      Instances: true,
      Images: true,
      Key_Pairs: true,
      Login: true,
      Error_404: true
    },
    component: {
      edit_button: true,
      publish_button: false
    }
  },
  user: {
    page: {
      home: true,
      home_index: true,
      about: true,
      argu: true,
      count_to: true,
      menu_page: true,
      upload: true,
      form: true,
      folder_tree: true,
      table_page: true,
      render_page: true,
      split_pane: true,
      parent: true,
      child: true,
      named_view: true,
      store: true,
      main: true
    },
    component: {
      edit_button: true,
      publish_button: false
    }
  }
}
