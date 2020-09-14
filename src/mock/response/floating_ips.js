import bus from '@/lib/bus'

export const floatingIpsCol = [
  {
    type: 'selection',
    width: 52,
    align: 'center'
  },
  {
    key: 'floating_ip_address',
    title: 'IP Address',
    width: 117,
    sortable: true
  },
  {
    key: 'description',
    title: 'Description',
    minWidth: 121,
    sortable: true
  },
  {
    key: 'mapped_fixed_ip_address',
    title: 'Mapped Fixed IP Address',
    minWidth: 200,
    sortable: true
  },
  {
    key: 'pool',
    title: 'Pool',
    minWidth: 88,
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    width: 92,
    sortable: true
  },
  {
    key: 'actions',
    title: 'Actions',
    width: 136,
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

export const confirmModalTexts = txt => {
  const selectedText = `You have selected: ${txt}. Please confirm your selection.`
  return {
    disassociate: {
      title: 'Confirm Disassociate',
      text: selectedText,
      confirmText: 'Disassociate',
      type: 'disassociate'
    },
    release: {
      title: 'Confirm Release Floating IPs',
      text: selectedText + ' Once a floating IP is released, there is no guarantee the same IP can be allocated again.',
      confirmText: 'Release Floating IPs',
      type: 'release'
    }
  }
}

export const allocateValues = pool => {
  return [
    {
      name: 'floating_network_id',
      type: 'i-select',
      value: pool.length > 0 ? pool[0].value : '',
      label: 'Pool',
      placeholder: 'Select a pool',
      not_found_text: 'No pools available',
      rule: [
        {
          required: true,
          message: 'Please choose a pool',
          trigger: 'blur'
        }
      ],
      children: {
        type: 'i-option',
        list: pool
      }
    },
    {
      name: 'description',
      type: 'i-input',
      value: '',
      label: 'Description'
    }
  ]
}

export const associateValues = port => {
  return [
    {
      name: 'port_id',
      type: 'i-select',
      value: port.length > 0 ? port[0].value : '',
      label: 'Port to be associated',
      placeholder: 'Select a port',
      not_found_text: 'No ports available',
      rule: [
        {
          required: true,
          message: 'Please choose a port',
          trigger: 'blur'
        }
      ],
      children: {
        type: 'i-option',
        list: port
      }
    }
  ]
}
