// 参考资料: https://rachel53461.wordpress.com/2014/04/20/algorithm-for-drawing-trees/
export const calculateTreeXY = (root) => {
  initializeNodes(root, 0)
  calculateInitialY(root)
  // checkAllChildrenOnScreen(root)
}

// 递归初始化x、y和mod值(位移值)
const initializeNodes = (node, depth) => {
  node.children.forEach((item, index) => {
    initializeNodes(item, depth + 1)
    // 初始化y值(在同一父节点下的相对值)
    item.y = index
    item.x = depth
    item.mod = 0
  })
}

const calculateInitialY = (node) => {
  const siblings = node.children
  for (let i = 0; i < siblings.length; ++i) {
    const current = siblings[i]
    calculateInitialY(current)

    // 根据子节点计算current居中放置的y值(相对子节点的相对值)
    const children = current.children
    const childrenNum = children.length
    if (childrenNum === 1) { // 只有一个子节点
      current.desiredY = children[0].y
    } else if (childrenNum > 1) { // 多个子节点
      current.desiredY = (children[0].y + children[childrenNum - 1].y) / 2
    } else { // 没有子节点
      current.desiredY = current.y
    }

    // 计算居中后current此时的y值(绝对值)和其子节点此时需要的最终位移值(mod)
    setModYAfterCenter(current, i, siblings)
    // 如果current有子节点并且不为同一父节点下第一个子节点，则检查其子树是否有重叠，如果有就进行位移
    if (childrenNum && i) checkNodeConflicts(current, siblings, i)
  }
}

const setModYAfterCenter = (node, index, siblings) => {
  if (!index) { // node为同一父节点下第一个子节点
    node.y = node.desiredY
  } else {
    node.y = siblings[index - 1].y + 1
    node.mod = node.y - node.desiredY
  }
}

const checkNodeConflicts = (node, siblings, index) => {
  // 计算node的子树中每层最小y值
  const nodeContour = {}
  getUpContour(node, 0, nodeContour)

  // 遍历node在同一父节点下的每一个y值比其小的节点，检查是否有重叠部分
  for (let i = 0; i < index; ++i) {
    // 计算sibling的子树中每层最大y值
    const sibling = siblings[i]
    const siblingContour = {}
    getDownContour(sibling, 0, siblingContour)
    // 计算可能有重叠部分的层数
    const siblingContourDepthNum = Object.keys(siblingContour).map(Number)
    const nodeContourDepthNum = Object.keys(nodeContour).map(Number)
    const depthInCommon = Math.min(Math.max(...siblingContourDepthNum), Math.max(...nodeContourDepthNum))

    // 遍历每一个可能重叠的层，如果node的子树在某一层中最小y值减去sibling的子树在该层的最大y值(变量distance)小于1，
    // 则该node的子树需要整体向下位移distance的距离
    let shiftValue = 0
    for (let depth = node.x + 1; depth < depthInCommon + 1; ++depth) {
      const distance = nodeContour[depth] - siblingContour[depth]
      if (distance < 1) shiftValue = 1 - distance
    }
    if (shiftValue > 0) {
      node.y += shiftValue
      node.mod += shiftValue
      // 把两个有重叠的节点中间的节点居中
      centerNodesInBetween(i, index, siblings)
    }
  }
}

const centerNodesInBetween = (upIndex, downIndex, siblings) => {
  const upNode = siblings[upIndex]
  const downNode = siblings[downIndex]
  const numNodesBetween = (downIndex - upIndex) - 1

  if (numNodesBetween > 0) {
    const distanceBetweenNodes = (downNode.y - upNode.y) / (numNodesBetween + 1)
    let count = 1

    // 计算每个中间节点需要向下位移的距离
    for (let i = upIndex + 1; i < downIndex; i++) {
      const middleNode = siblings[i]
      const desiredY = upNode.y + (distanceBetweenNodes * count)
      const offset = desiredY - middleNode.y
      middleNode.y += offset
      middleNode.mod += offset
      count++
    }

    checkNodeConflicts(downNode, siblings, downIndex)
  }
}

const checkAllChildrenOnScreen = (node) => {
  const nodeContour = {}
  getUpContour(node, 0, nodeContour)

  // 如果node的子树有节点y值小于0，整个子树向下位移
  let shiftAmount = 0
  Object.values(nodeContour).forEach(y => {
    if (y + shiftAmount < 0) shiftAmount = -y
  })

  if (shiftAmount > 0) {
    node.y += shiftAmount
    node.mod += shiftAmount
  }
}

const getUpContour = (node, modSum, values) => {
  if (!(node.x in values)) values[node.x] = node.y + modSum
  else values[node.x] = Math.min(values[node.x], node.y + modSum)

  modSum += node.mod
  node.children.forEach(child => {
    getUpContour(child, modSum, values)
  })
}

const getDownContour = (node, modSum, values) => {
  if (!(node.x in values)) values[node.x] = node.y + modSum
  else values[node.x] = Math.max(values[node.x], node.y + modSum)

  modSum += node.mod
  node.children.forEach(child => {
    getDownContour(child, modSum, values)
  })
}
