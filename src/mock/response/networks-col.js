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
    minWidth: 180,
    sortable: true
  },
  {
    key: 'shared',
    title: 'Shared',
    minWidth: 96,
    sortable: true
  },
  {
    key: 'external',
    title: 'External',
    minWidth: 102,
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    minWidth: 100,
    sortable: true
  },
  {
    key: 'admin_state_up',
    title: 'Admin State',
    minWidth: 125,
    sortable: true
  },
  {
    key: 'availability_zones',
    title: 'Availability Zones',
    minWidth: 156,
    sortable: true
  },
  {
    key: 'actions',
    title: 'Actions',
    width: 130,
    align: 'center',
    render: (h, { row, column, index }) => {
      return h('div', [
        h('Button', {
          type: 'primary',
          size: 'small',
          on: {
            click: () => station.$emit('on-click-edit', index)
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
      label: 'Name',
      rule: [
        {
          required: true,
          message: 'The name cannot be empty',
          trigger: 'blur'
        }
      ]
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
