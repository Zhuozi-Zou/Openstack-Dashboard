export const topoDataRaw = [
  {
    data: {
      id: 'phy1',
      name: '物理出口' // 名字
    },
    clazz: 'phy', // 种类type，比如这里就是物理出口
    children: [
      {
        data: {
          id: 'router1',
          name: '路由1' // 名字
        },
        clazz: 'router', // 种类type，比如这里就是路由
        url: '', // 如果需要点击就跳转到详情页面的话
        children: [
          {
            data: {
              id: 'network1',
              name: '交换机1' // 名字
            },
            clazz: 'network', // 种类type，比如这里就是交换机
            url: '', // 如果需要点击就跳转到详情页面的话
            children: [
              {
                data: {
                  id: 'subnet1',
                  name: '子网1' // 名字
                },
                clazz: 'subnet', // 种类type，比如这里就是子网
                url: '', // 如果需要点击就跳转到详情页面的话
                children: [
                  {
                    data: {
                      id: 'instance1',
                      name: '虚拟机1' // 名字
                    },
                    clazz: 'instance', // 种类type，比如这里就是虚拟机
                    url: '', // 如果需要点击就跳转到详情页面的话
                    children: []
                  }
                ]
              },
              {
                data: {
                  id: 'subnet2',
                  name: '子网2' // 名字
                },
                clazz: 'subnet', // 种类type，比如这里就是子网
                url: '', // 如果需要点击就跳转到详情页面的话
                children: [
                  {
                    data: {
                      id: 'security1',
                      name: '安全组1' // 名字
                    },
                    clazz: 'security',
                    url: '',
                    children: [
                      {
                        data: {
                          id: 'instance2',
                          name: '虚拟机2' // 名字
                        },
                        clazz: 'instance', // 种类type，比如这里就是虚拟机
                        url: '', // 如果需要点击就跳转到详情页面的话
                        children: []
                      }
                    ]
                  }
                ]
              },
              {
                data: {
                  id: 'subnet3',
                  name: '子网3' // 名字
                },
                clazz: 'subnet', // 种类type，比如这里就是子网
                url: '', // 如果需要点击就跳转到详情页面的话
                children: [
                  {
                    data: {
                      id: 'instance3',
                      name: '虚拟机3' // 名字
                    },
                    clazz: 'instance', // 种类type，比如这里就是虚拟机
                    url: '', // 如果需要点击就跳转到详情页面的话
                    children: []
                  }]
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
    clazz: 'javaTask',
    children: [
      {
        id: '211',
        label: 'E',
        clazz: 'javaTask',
        children: [
          {
            id: '311',
            label: 'A',
            clazz: 'javaTask',
            children: [
              {
                id: '1',
                label: 'O2',
                clazz: 'javaTask',
                children: [
                  {
                    id: '2',
                    label: 'E2',
                    clazz: 'javaTask',
                    children: [
                      {
                        id: '3',
                        label: 'A2',
                        clazz: 'javaTask',
                        children: [
                          {
                            id: '8',
                            label: 'N2',
                            clazz: 'javaTask',
                            children: [
                              {
                                id: '9',
                                label: 'G2',
                                clazz: 'javaTask',
                                children: []
                              },
                              {
                                id: '10',
                                label: 'M2',
                                clazz: 'javaTask',
                                children: [
                                  {
                                    id: '16',
                                    label: 'P2',
                                    clazz: 'javaTask',
                                    children: []
                                  },
                                  {
                                    id: '11',
                                    label: 'H2',
                                    clazz: 'javaTask',
                                    children: []
                                  },
                                  {
                                    id: '12',
                                    label: 'I2',
                                    clazz: 'javaTask',
                                    children: []
                                  },
                                  {
                                    id: '13',
                                    label: 'J2',
                                    clazz: 'javaTask',
                                    children: []
                                  },
                                  {
                                    id: '14',
                                    label: 'K2',
                                    clazz: 'javaTask',
                                    children: []
                                  },
                                  {
                                    id: '15',
                                    label: 'L2',
                                    clazz: 'javaTask',
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
                        clazz: 'javaTask',
                        children: [
                          {
                            id: '5',
                            label: 'B2',
                            clazz: 'javaTask',
                            children: []
                          },
                          {
                            id: '6',
                            label: 'C2',
                            clazz: 'javaTask',
                            children: []
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: '7',
                    label: 'F2',
                    clazz: 'javaTask',
                    children: []
                  },
                  {
                    id: '17',
                    label: 'Q2',
                    clazz: 'javaTask',
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: '411',
            label: 'D',
            clazz: 'javaTask',
            children: [
              {
                id: '511',
                label: 'B',
                clazz: 'javaTask',
                children: []
              },
              {
                id: '611',
                label: 'C',
                clazz: 'javaTask',
                children: []
              }
            ]
          }
        ]
      },
      {
        id: '711',
        label: 'F',
        clazz: 'javaTask',
        children: []
      },
      {
        id: '1711',
        label: 'Q',
        clazz: 'javaTask',
        children: []
      },
      {
        id: '811',
        label: 'N',
        clazz: 'javaTask',
        children: [
          {
            id: '911',
            label: 'G',
            clazz: 'javaTask',
            children: []
          },
          {
            id: '1011',
            label: 'M',
            clazz: 'javaTask',
            children: [
              {
                id: '1611',
                label: 'P',
                clazz: 'javaTask',
                children: []
              },
              {
                id: '1111',
                label: 'H',
                clazz: 'javaTask',
                children: []
              },
              {
                id: '1211',
                label: 'I',
                clazz: 'javaTask',
                children: []
              },
              {
                id: '1311',
                label: 'J',
                clazz: 'javaTask',
                children: []
              },
              {
                id: '1411',
                label: 'K',
                clazz: 'javaTask',
                children: []
              },
              {
                id: '1511',
                label: 'L',
                clazz: 'javaTask',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
]
