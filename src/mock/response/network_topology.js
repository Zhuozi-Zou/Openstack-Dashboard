export const topoDataRaw = {
  id: 'phy1',
  label: '物理出口', // 名字
  clazz: 'phy', // 种类type，比如这里就是物理出口
  url: '', // 如果需要点击就跳转到详情页面的话
  next_nodes: [
    {
      id: 'router1',
      label: '路由1', // 名字
      clazz: 'router', // 种类type，比如这里就是路由
      url: '', // 如果需要点击就跳转到详情页面的话
      next_nodes: [
        {
          id: 'network1',
          label: '交换机1', // 名字
          clazz: 'network', // 种类type，比如这里就是交换机
          url: '', // 如果需要点击就跳转到详情页面的话
          next_nodes: [
            {
              id: 'subnet1',
              label: '子网1', // 名字
              clazz: 'subnet', // 种类type，比如这里就是子网
              url: '', // 如果需要点击就跳转到详情页面的话
              next_nodes: [
                {
                  id: 'instance1',
                  label: '虚拟机1', // 名字
                  clazz: 'instance', // 种类type，比如这里就是虚拟机
                  url: '', // 如果需要点击就跳转到详情页面的话
                  next_nodes: []
                }
              ]
            },
            {
              id: 'subnet2',
              label: '子网2', // 名字
              clazz: 'subnet', // 种类type，比如这里就是子网
              url: '', // 如果需要点击就跳转到详情页面的话
              next_nodes: [
                {
                  id: 'instance2',
                  label: '虚拟机2', // 名字
                  clazz: 'instance', // 种类type，比如这里就是虚拟机
                  url: '', // 如果需要点击就跳转到详情页面的话
                  next_nodes: []
                }
              ]
            },
            {
              id: 'subnet3',
              label: '子网3', // 名字
              clazz: 'subnet', // 种类type，比如这里就是子网
              url: '', // 如果需要点击就跳转到详情页面的话
              next_nodes: []
            }
          ]
        }
      ]
    }
  ]
}
