export function getShapeName (clazz) {
  switch (clazz) {
    case 'phy':
      return 'java-task-node'
    case 'router':
      return 'java-task-node'
    case 'network':
      return 'java-task-node'
    case 'subnet':
      return 'java-task-node'
    case 'instance':
      return 'java-task-node'
    case 'security':
      return 'java-task-node'
    // 以下为原始数据：
    case 'start':
      return 'start-node'
    case 'end':
      return 'end-node'
    case 'gateway':
      return 'gateway-node'
    case 'exclusiveGateway':
      return 'exclusive-gateway-node'
    case 'parallelGateway':
      return 'parallel-gateway-node'
    case 'inclusiveGateway':
      return 'inclusive-gateway-node'
    case 'timerStart':
      return 'timer-start-node'
    case 'messageStart':
      return 'message-start-node'
    case 'signalStart':
      return 'signal-start-node'
    case 'userTask':
      return 'user-task-node'
    case 'scriptTask':
      return 'script-task-node'
    case 'mailTask':
      return 'mail-task-node'
    case 'javaTask':
      return 'java-task-node'
    case 'receiveTask':
      return 'receive-task-node'
    case 'timerCatch':
      return 'timer-catch-node'
    case 'messageCatch':
      return 'message-catch-node'
    case 'signalCatch':
      return 'signal-catch-node'
    case 'subProcess':
      return 'sub-process-node'
    default:
      return 'task-node'
  }
}
