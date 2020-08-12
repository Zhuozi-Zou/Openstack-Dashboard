import bus from '@/lib/bus'

export const floatingIpsCol = [
  {
    type: 'selection',
    width: 50,
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
    width: 130,
    align: 'center',
    render: (h, { row, index }) => {
      const active = row.status === 'Active'
      return h('div', [
        h('Button', {
          type: 'primary',
          size: 'small',
          on: {
            click: () => {
              if (active) bus.$emit('on-floatingIps-disassociate-open', index)
              else bus.$emit('on-floatingIps-associate-open', index)
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
      text: selectedText
    },
    release: {
      title: 'Confirm Release Floating IPs',
      text: selectedText + ' Once a floating IP is released, there is no guarantee the same IP can be allocated again.'
    }
  }
}
