export const demoDataNodes = [
  {
    id: 'startNode1',
    x: 50,
    y: 200,
    label: '',
    clazz: 'start'
  },
  {
    id: 'startNode2',
    x: 50,
    y: 320,
    label: '',
    clazz: 'timerStart'
  },
  {
    id: 'taskNode1',
    x: 200,
    y: 200,
    label: '主任审批',
    clazz: 'userTask'
  },
  {
    id: 'taskNode2',
    x: 400,
    y: 200,
    label: '经理审批',
    clazz: 'scriptTask'
  },
  {
    id: 'gatewayNode',
    x: 400,
    y: 320,
    label: '金额大于1000',
    clazz: 'inclusiveGateway'
  },
  {
    id: 'taskNode3',
    x: 400,
    y: 450,
    label: '董事长审批',
    clazz: 'receiveTask'
  },
  {
    id: 'catchNode1',
    x: 600,
    y: 200,
    label: '等待结束',
    clazz: 'signalCatch'
  },
  {
    id: 'endNode',
    x: 600,
    y: 320,
    label: '',
    clazz: 'end'
  }
]

export const demoDataEdges = [
  {
    source: 'startNode1',
    target: 'taskNode1',
    sourceAnchor: 1,
    targetAnchor: 3,
    clazz: 'flow'
  },
  {
    source: 'startNode2',
    target: 'gatewayNode',
    sourceAnchor: 1,
    targetAnchor: 3,
    clazz: 'flow'
  },
  {
    source: 'taskNode1',
    target: 'catchNode1',
    sourceAnchor: 0,
    targetAnchor: 0,
    clazz: 'flow'
  },
  {
    source: 'taskNode1',
    target: 'taskNode2',
    sourceAnchor: 1,
    targetAnchor: 3,
    clazz: 'flow'
  },
  {
    source: 'taskNode2',
    target: 'gatewayNode',
    sourceAnchor: 1,
    targetAnchor: 0,
    clazz: 'flow'
  },
  {
    source: 'taskNode2',
    target: 'taskNode1',
    sourceAnchor: 2,
    targetAnchor: 2,
    clazz: 'flow'
  },
  {
    source: 'gatewayNode',
    target: 'taskNode3',
    sourceAnchor: 2,
    targetAnchor: 0,
    clazz: 'flow'
  },
  {
    source: 'gatewayNode',
    target: 'endNode',
    sourceAnchor: 1,
    targetAnchor: 2,
    clazz: 'flow'
  },
  {
    source: 'taskNode3',
    target: 'endNode',
    sourceAnchor: 1,
    targetAnchor: 1,
    clazz: 'flow'
  },
  {
    source: 'catchNode1',
    target: 'endNode',
    sourceAnchor: 1,
    targetAnchor: 0,
    clazz: 'flow'
  }
]

export const demoData1Nodes = [
  {
    id: 'startNode1',
    x: 50,
    y: 200,
    label: '',
    clazz: 'start'
  },
  {
    id: 'startNode2',
    x: 50,
    y: 320,
    label: '',
    clazz: 'timerStart'
  },
  {
    id: 'taskNode1',
    x: 200,
    y: 200,
    label: '主任审批',
    clazz: 'userTask'
  },
  {
    id: 'taskNode2',
    x: 400,
    y: 200,
    label: '经理审批',
    clazz: 'scriptTask',
    active: true
  },
  {
    id: 'gatewayNode',
    x: 400,
    y: 320,
    label: '金额大于1000',
    clazz: 'gateway'
  },
  {
    id: 'taskNode3',
    x: 400,
    y: 450,
    label: '董事长审批',
    clazz: 'receiveTask'
  },
  {
    id: 'catchNode1',
    x: 600,
    y: 200,
    label: '等待结束',
    clazz: 'signalCatch'
  },
  {
    id: 'endNode',
    x: 600,
    y: 320,
    label: '',
    clazz: 'end'
  }
]

export const demoData1Edges = [
  {
    source: 'startNode1',
    target: 'taskNode1',
    sourceAnchor: 1,
    targetAnchor: 3,
    clazz: 'flow'
  },
  {
    source: 'startNode2',
    target: 'gatewayNode',
    sourceAnchor: 1,
    targetAnchor: 3,
    clazz: 'flow'
  },
  {
    source: 'taskNode1',
    target: 'catchNode1',
    sourceAnchor: 0,
    targetAnchor: 0,
    clazz: 'flow'
  },
  {
    source: 'taskNode1',
    target: 'taskNode2',
    sourceAnchor: 1,
    targetAnchor: 3,
    clazz: 'flow'
  },
  {
    source: 'taskNode2',
    target: 'gatewayNode',
    sourceAnchor: 1,
    targetAnchor: 0,
    clazz: 'flow'
  },
  {
    source: 'taskNode2',
    target: 'taskNode1',
    sourceAnchor: 2,
    targetAnchor: 2,
    clazz: 'flow'
  },
  {
    source: 'gatewayNode',
    target: 'taskNode3',
    sourceAnchor: 2,
    targetAnchor: 0,
    clazz: 'flow'
  },
  {
    source: 'gatewayNode',
    target: 'endNode',
    sourceAnchor: 1,
    targetAnchor: 2,
    clazz: 'flow'
  },
  {
    source: 'taskNode3',
    target: 'endNode',
    sourceAnchor: 1,
    targetAnchor: 1,
    clazz: 'flow'
  },
  {
    source: 'catchNode1',
    target: 'endNode',
    sourceAnchor: 1,
    targetAnchor: 0,
    clazz: 'flow'
  }
]

export const candidateUsers = [
  {
    id: '1',
    name: 'Tom'
  }, {
    id: '2',
    name: 'Steven'
  }, {
    id: '3',
    name: 'Andy'
  }
]

export const candidateGroups = [
  {
    id: '1',
    name: 'Manager'
  }, {
    id: '2',
    name: 'Security'
  }, {
    id: '3',
    name: 'OA'
  }
]

export const categories = [
  {
    id: '1',
    name: 'Common'
  }, {
    id: '2',
    name: 'Subsidy'
  }, {
    id: '3',
    name: 'Maintain'
  }
]
