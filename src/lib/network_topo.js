export const getTopoDetailData = (model) => {
  switch (model.clazz) {
    case 'phy':
      return networkDetailData(model.data)
    case 'router':
      return routerDetailData(model.data)
    case 'network':
      return networkDetailData(model.data)
  }
}

const networkDetailData = phy => {
  return [
    {
      name: 'name',
      type: 'i-input',
      readOnly: true,
      value: phy.name
    },
    {
      name: 'id',
      type: 'i-input',
      subType: 'textarea',
      readOnly: true,
      value: phy.id
    },
    {
      name: 'project_id',
      type: 'i-input',
      subType: 'textarea',
      readOnly: true,
      value: phy.project_id
    },
    {
      name: 'status',
      type: 'i-input',
      readOnly: true,
      value: phy.status
    },
    {
      name: 'admin_state_up',
      type: 'i-input',
      readOnly: true,
      value: phy.admin_state_up ? 'UP' : 'DOWN'
    },
    {
      name: 'shared',
      type: 'i-input',
      readOnly: true,
      value: phy.shared ? 'Yes' : 'No'
    },
    {
      name: 'router:external',
      type: 'i-input',
      readOnly: true,
      value: phy['router:external'] ? 'Yes' : 'No'
    },
    {
      name: 'mtu',
      type: 'i-input',
      readOnly: true,
      value: phy.mtu
    },
    {
      name: 'provider',
      type: 'div',
      children: {
        type: 'i-input',
        list: [
          {
            name: 'provider:network_type',
            readOnly: true,
            value: phy['provider:network_type']
          },
          {
            name: 'provider:physical_network',
            readOnly: true,
            value: phy['provider:physical_network']
          },
          {
            name: 'provider:segmentation_id',
            readOnly: true,
            value: phy['provider:segmentation_id'] || '-'
          }
        ]
      }
    }
  ]
}

const routerDetailData = router => {
  return [
    {
      name: 'name',
      type: 'i-input',
      readOnly: true,
      value: router.name
    },
    {
      name: 'id',
      type: 'i-input',
      subType: 'textarea',
      readOnly: true,
      value: router.id
    },
    {
      name: 'description',
      type: 'i-input',
      subType: 'textarea',
      readOnly: true,
      value: router.description
    },
    {
      name: 'project_id',
      type: 'i-input',
      subType: 'textarea',
      readOnly: true,
      value: router.project_id
    },
    {
      name: 'status',
      type: 'i-input',
      readOnly: true,
      value: router.status
    },
    {
      name: 'admin_state_up',
      type: 'i-input',
      readOnly: true,
      value: router.admin_state_up ? 'UP' : 'DOWN'
    },
    {
      name: 'availability_zones',
      type: 'div',
      children: {
        type: 'li',
        list: router.availability_zones.map(zone => {
          return { title: zone }
        })
      }
    }
  ]
}
