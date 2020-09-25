export const topoDataRaw = [
  {
    id: 'phy1',
    label: '物理出口', // 名字
    clazz: 'phy', // 种类type，比如这里就是物理出口
    url: '', // 如果需要点击就跳转到详情页面的话
    children: [
      {
        id: 'router1',
        label: '路由1', // 名字
        clazz: 'router', // 种类type，比如这里就是路由
        url: '', // 如果需要点击就跳转到详情页面的话
        children: [
          {
            id: 'network1',
            label: '交换机1', // 名字
            clazz: 'network', // 种类type，比如这里就是交换机
            url: '', // 如果需要点击就跳转到详情页面的话
            children: [
              {
                id: 'subnet1',
                label: '子网1', // 名字
                clazz: 'subnet', // 种类type，比如这里就是子网
                url: '', // 如果需要点击就跳转到详情页面的话
                children: [
                  {
                    id: 'instance1',
                    label: '虚拟机1', // 名字
                    clazz: 'instance', // 种类type，比如这里就是虚拟机
                    url: '', // 如果需要点击就跳转到详情页面的话
                    children: []
                  }
                ]
              },
              {
                id: 'subnet2',
                label: '子网2', // 名字
                clazz: 'subnet', // 种类type，比如这里就是子网
                url: '', // 如果需要点击就跳转到详情页面的话
                children: [
                  {
                    id: 'instance2',
                    label: '虚拟机2', // 名字
                    clazz: 'instance', // 种类type，比如这里就是虚拟机
                    url: '', // 如果需要点击就跳转到详情页面的话
                    children: []
                  }
                ]
              },
              {
                id: 'subnet3',
                label: '子网3', // 名字
                clazz: 'subnet', // 种类type，比如这里就是子网
                url: '', // 如果需要点击就跳转到详情页面的话
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
]

export const testData = [
  {
    id: '111',
    label: 'O',
    clazz: 'inclusiveGateway',
    children: [
      {
        id: '211',
        label: 'E',
        clazz: 'inclusiveGateway',
        children: [
          {
            id: '311',
            label: 'A',
            clazz: 'inclusiveGateway',
            children: [
              {
                id: '1',
                label: 'O2',
                clazz: 'inclusiveGateway',
                children: [
                  {
                    id: '2',
                    label: 'E2',
                    clazz: 'inclusiveGateway',
                    children: [
                      {
                        id: '3',
                        label: 'A2',
                        clazz: 'inclusiveGateway',
                        children: [
                          {
                            id: '8',
                            label: 'N2',
                            clazz: 'inclusiveGateway',
                            children: [
                              {
                                id: '9',
                                label: 'G2',
                                clazz: 'inclusiveGateway',
                                children: []
                              },
                              {
                                id: '10',
                                label: 'M2',
                                clazz: 'inclusiveGateway',
                                children: [
                                  {
                                    id: '16',
                                    label: 'P2',
                                    clazz: 'inclusiveGateway',
                                    children: []
                                  },
                                  {
                                    id: '11',
                                    label: 'H2',
                                    clazz: 'inclusiveGateway',
                                    children: []
                                  },
                                  {
                                    id: '12',
                                    label: 'I2',
                                    clazz: 'inclusiveGateway',
                                    children: []
                                  },
                                  {
                                    id: '13',
                                    label: 'J2',
                                    clazz: 'inclusiveGateway',
                                    children: []
                                  },
                                  {
                                    id: '14',
                                    label: 'K2',
                                    clazz: 'inclusiveGateway',
                                    children: []
                                  },
                                  {
                                    id: '15',
                                    label: 'L2',
                                    clazz: 'inclusiveGateway',
                                    children: []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        id: '4',
                        label: 'D2',
                        clazz: 'inclusiveGateway',
                        children: [
                          {
                            id: '5',
                            label: 'B2',
                            clazz: 'inclusiveGateway',
                            children: []
                          },
                          {
                            id: '6',
                            label: 'C2',
                            clazz: 'inclusiveGateway',
                            children: []
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: '7',
                    label: 'F2',
                    clazz: 'inclusiveGateway',
                    children: []
                  },
                  {
                    id: '17',
                    label: 'Q2',
                    clazz: 'inclusiveGateway',
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: '411',
            label: 'D',
            clazz: 'inclusiveGateway',
            children: [
              {
                id: '511',
                label: 'B',
                clazz: 'inclusiveGateway',
                children: []
              },
              {
                id: '611',
                label: 'C',
                clazz: 'inclusiveGateway',
                children: []
              }
            ]
          }
        ]
      },
      {
        id: '711',
        label: 'F',
        clazz: 'inclusiveGateway',
        children: []
      },
      {
        id: '1711',
        label: 'Q',
        clazz: 'inclusiveGateway',
        children: []
      },
      {
        id: '811',
        label: 'N',
        clazz: 'inclusiveGateway',
        children: [
          {
            id: '911',
            label: 'G',
            clazz: 'inclusiveGateway',
            children: []
          },
          {
            id: '1011',
            label: 'M',
            clazz: 'inclusiveGateway',
            children: [
              {
                id: '1611',
                label: 'P',
                clazz: 'inclusiveGateway',
                children: []
              },
              {
                id: '1111',
                label: 'H',
                clazz: 'inclusiveGateway',
                children: []
              },
              {
                id: '1211',
                label: 'I',
                clazz: 'inclusiveGateway',
                children: []
              },
              {
                id: '1311',
                label: 'J',
                clazz: 'inclusiveGateway',
                children: []
              },
              {
                id: '1411',
                label: 'K',
                clazz: 'inclusiveGateway',
                children: []
              },
              {
                id: '1511',
                label: 'L',
                clazz: 'inclusiveGateway',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
]
