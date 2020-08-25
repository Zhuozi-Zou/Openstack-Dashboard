import bus from '@/lib/bus'

export const instancesCol = [
  {
    type: 'selection',
    width: 50,
    align: 'center'
  },
  {
    key: 'name',
    title: 'Instance Name',
    minWidth: 100,
    sortable: true
  },
  {
    key: 'image_name',
    title: 'Image Name',
    minWidth: 100,
    sortable: true
  },
  {
    key: 'ip_address',
    title: 'IP Address',
    minWidth: 140,
    sortable: true
  },
  {
    key: 'flavor',
    title: 'Flavor',
    minWidth: 91,
    sortable: true
  },
  {
    key: 'key_name',
    title: 'Key Pair',
    minWidth: 103,
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    width: 92,
    sortable: true
  },
  {
    key: 'OS-EXT-AZ:availability_zone',
    title: 'Availability Zone',
    width: 150,
    sortable: true
  },
  {
    key: 'OS-EXT-STS:task_state',
    title: 'Task',
    minWidth: 100,
    sortable: true
  },
  {
    key: 'OS-EXT-STS:power_state',
    title: 'Power State',
    width: 124,
    sortable: true
  },
  {
    key: 'age',
    title: 'Age',
    minWidth: 55,
    sortable: true
  },
  {
    key: 'actions',
    title: 'Actions',
    width: 130,
    align: 'center',
    render: (h, { row }) => {
      const active = row.status === 'Active'
      return h('div', [
        h('Button', {
          type: 'primary',
          size: 'small',
          on: {
            click: () => {
              if (active) bus.$emit('on-floatingIps-disassociate-open', row)
              else bus.$emit('on-floatingIps-associate-open', row)
            }
          }
        }, active ? 'Disassociate' : 'Associate')
      ])
    }
  }
]
