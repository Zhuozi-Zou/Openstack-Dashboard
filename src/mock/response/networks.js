import { station } from '@/lib/util'

export const networksCol = [
  {
    type: 'selection',
    width: 50,
    align: 'center'
  },
  {
    key: 'name',
    title: 'Name',
    minWidth: 88,
    sortable: true
  },
  {
    key: 'subnets_associated',
    title: 'Subnets Associated',
    minWidth: 200,
    sortable: true,
    render: (h, { row }) => {
      return h('ul', {
        style: {
          'list-style-type': 'none'
        }
      }, row.subnets_associated.map(item => {
        return h('li', item)
      }))
    }
  },
  {
    key: 'shared',
    title: 'Shared',
    width: 96,
    sortable: true
  },
  {
    key: 'external',
    title: 'External',
    width: 102,
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    width: 100,
    sortable: true
  },
  {
    key: 'admin_state_up',
    title: 'Admin State',
    width: 125,
    sortable: true
  },
  {
    key: 'availability_zones',
    title: 'Availability Zones',
    minWidth: 156,
    sortable: true,
    render: (h, { row }) => {
      return h('span', row.availability_zones.join(',\n'))
    }
  },
  {
    key: 'actions',
    title: 'Actions',
    width: 130,
    align: 'center',
    render: (h, { index }) => {
      return h('div', [
        h('Button', {
          type: 'primary',
          size: 'small',
          on: {
            click: () => station.$emit('on-modal-edit-open', index)
          }
        }, 'Edit Network')
      ])
    }
  }
]

export const editableValues = net => {
  return [
    {
      name: 'name',
      type: 'i-input',
      value: net.name,
      label: 'Name'
    },
    {
      name: 'admin_state_up',
      type: 'checkbox',
      value: net.admin_state_up,
      label: 'Enable Admin State'
    },
    {
      name: 'shared',
      type: 'checkbox',
      value: net.shared,
      label: 'Shared'
    }
  ]
}

export const newNetworkValues = [
  {
    name: 'name',
    type: 'i-input',
    value: '',
    label: 'Network Name'
  },
  {
    name: 'admin_state_up',
    type: 'checkbox',
    value: true,
    label: 'Enable Admin State'
  },
  {
    name: 'shared',
    type: 'checkbox',
    value: false,
    label: 'Shared'
  },
  {
    name: 'create_subnet',
    type: 'checkbox',
    value: true,
    label: 'Create Subnet'
  }
]

export const newSubnetValues = [
  {
    name: 'name',
    type: 'i-input',
    value: '',
    label: 'Subnet Name'
  },
  {
    name: 'cidr',
    type: 'i-input',
    value: '',
    label: 'Network Address',
    rule: [
      {
        required: true,
        message: 'Network address cannot be empty',
        trigger: 'blur'
      }
    ]
  }
]
