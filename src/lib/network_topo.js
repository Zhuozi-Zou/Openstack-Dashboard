export const getTopoDetailData = (model) => {
  switch (model.clazz) {
    case 'phy':
      return networkDetailData(model.data)
    case 'router':
      return routerDetailData(model.data)
    case 'network':
      return networkDetailData(model.data)
    case 'subnet':
      return subnetDetailData(model.data)
    case 'instance':
      return instanceDetailData(model.data)
    case 'security':
      return securityDetailData(model.data)
  }
}

const networkDetailData = net => {
  return [
    {
      name: 'name',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: net.name || ''
    },
    {
      name: 'id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: net.id
    },
    {
      name: 'project_id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: net.project_id
    },
    {
      name: 'status',
      type: 'i-input',
      readOnly: true,
      value: net.status
    },
    {
      name: 'admin_state_up',
      type: 'i-input',
      readOnly: true,
      value: net.admin_state_up ? 'UP' : 'DOWN'
    },
    {
      name: 'shared',
      type: 'i-input',
      readOnly: true,
      value: net.shared ? 'Yes' : 'No'
    },
    {
      name: 'router:external',
      type: 'i-input',
      readOnly: true,
      value: net['router:external'] ? 'Yes' : 'No'
    },
    {
      name: 'mtu',
      type: 'i-input',
      readOnly: true,
      value: net.mtu
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
            value: net['provider:network_type'] || '-'
          },
          {
            name: 'provider:physical_network',
            readOnly: true,
            value: net['provider:physical_network'] || '-'
          },
          {
            name: 'provider:segmentation_id',
            readOnly: true,
            value: net['provider:segmentation_id'] || '-'
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
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: router.name
    },
    {
      name: 'id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: router.id
    },
    {
      name: 'description',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: router.description
    },
    {
      name: 'project_id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
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
      style: { 'margin-top': '3px' },
      children: {
        type: 'li',
        list: router.availability_zones.map(zone => {
          return { title: zone }
        })
      }
    }
  ]
}

const subnetDetailData = subnet => {
  return [
    {
      name: 'name',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: subnet.name || ''
    },
    {
      name: 'id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: subnet.id
    },
    {
      name: 'project_id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: subnet.project_id
    },
    {
      name: 'network_name',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: subnet.network_name
    },
    {
      name: 'network_id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: subnet.network_id
    },
    {
      name: 'subnetpool_id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: subnet.subnetpool_id || 'None'
    },
    {
      name: 'ip_version',
      type: 'i-input',
      readOnly: true,
      value: `IPv${subnet.ip_version}`
    },
    {
      name: 'cidr',
      type: 'i-input',
      readOnly: true,
      value: subnet.cidr
    },
    {
      name: 'allocation_pools',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: subnet.allocation_pools.map(pool => {
        return `${pool.start} - ${pool.end}`
      }).join('\r\n')
    },
    {
      name: 'gateway_ip',
      type: 'i-input',
      readOnly: true,
      value: subnet.gateway_ip
    },
    {
      name: 'enable_dhcp',
      type: 'i-input',
      readOnly: true,
      value: subnet.enable_dhcp ? 'Yes' : 'No'
    },
    {
      name: 'dns_nameservers',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: subnet.dns_nameservers.join('\r\n')
    }
  ]
}

const instanceDetailData = instance => {
  return [
    {
      name: 'name',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: instance.name || ''
    },
    {
      name: 'id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: instance.id
    },
    {
      name: 'description',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: instance.description
    },
    {
      name: 'tenant_id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: instance.tenant_id
    },
    {
      name: 'status',
      type: 'i-input',
      readOnly: true,
      value: instance.status
    },
    {
      name: 'OS-EXT-AZ:availability_zone',
      type: 'i-input',
      readOnly: true,
      value: instance['OS-EXT-AZ:availability_zone']
    },
    {
      name: 'created',
      type: 'i-input',
      readOnly: true,
      value: getDateTimeStr(instance.created)
    },
    {
      name: 'age',
      type: 'i-input',
      readOnly: true,
      value: getAgeStr(instance.created)
    },
    {
      name: 'OS-EXT-SRV-ATTR:host',
      type: 'i-input',
      readOnly: true,
      value: instance['OS-EXT-SRV-ATTR:host']
    },
    {
      name: 'addresses',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: Object.entries(instance.addresses).map(([key, value]) => {
        return `${key}:\r\n${value.map(sub => sub.addr).join(', ')}`
      }).join('\r\n')
    }
  ]
}

const securityDetailData = group => {
  return [
    {
      name: 'name',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: group.name || ''
    },
    {
      name: 'id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: group.id
    },
    {
      name: 'description',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: group.description
    },
    {
      name: 'project_id',
      type: 'i-input',
      subType: 'textarea',
      autosize: true,
      readOnly: true,
      value: group.project_id
    },
    {
      name: 'security_group_rules',
      type: 'div',
      style: {
        'margin-top': '7px',
        'text-align': 'center'
      },
      children: {
        type: 'i-button',
        list: [
          { label: 'show_details' }
        ]
      }
    }
  ]
}

export const getModalData = model => {
  switch (model.clazz) {
    case 'security':
      return securityModalData(model.data.security_group_rules)
    default:
      return ''
  }
}

const securityModalData = rules => {
  return {
    titleClazz: 'rulesModalTitle',
    columns: [
      {
        key: 'direction',
        title: '方向',
        width: 75
      },
      {
        key: 'ethertype',
        title: '以太网类型',
        width: 100
      },
      {
        key: 'protocol',
        title: 'IP协议',
        minWidth: 85,
        maxWidth: 110
      },
      {
        key: 'port_range',
        title: '端口范围',
        width: 130
      },
      {
        key: 'remote_ip_prefix',
        title: '远端IP前缀',
        minWidth: 120
      },
      {
        key: 'remote_group_id',
        title: '远端安全组ID',
        minWidth: 120
      },
      {
        key: 'description',
        title: '描述',
        minWidth: 120
      }
    ],
    tableValues: rules.map(rule => {
      return {
        direction: rule.direction,
        ethertype: rule.ethertype,
        protocol: rule.protocol ? (rule.protocol).toUpperCase() : 'Any',
        port_range: formatSecurityRulesPortRange(rule.port_range_min, rule.port_range_max),
        remote_ip_prefix: rule.remote_ip_prefix || '-',
        remote_group_id: rule.remote_group_id || '-',
        description: rule.description || '-'
      }
    })
  }
}

const getAgeStr = (createdTimeStr) => {
  const ageTime = new Date().getTime() - new Date(createdTimeStr).getTime()
  let daysLeft = Math.floor(ageTime / (1000 * 60 * 60 * 24))
  let secLeft = Math.floor((ageTime % (1000 * 60 * 60 * 24)) / 1000) || 1

  const year = Math.floor(daysLeft / 365)
  daysLeft -= year * 365
  const month = Math.floor(daysLeft / 30)
  daysLeft -= month * 30
  const week = Math.floor(daysLeft / 7)
  daysLeft -= week * 7
  const day = year ? 0 : daysLeft

  const hr = (year || month) ? 0 : Math.floor(secLeft / 3600)
  secLeft -= hr * 3600
  const min = (year || month || week) ? 0 : Math.floor(secLeft / 60)
  secLeft -= min * 60
  const sec = (year || month || week || day) ? 0 : secLeft

  let ageStr = ''
  if (year) ageStr += `${year} year(s), `
  if (month) ageStr += `${month} month(s), `
  if (week) ageStr += `${week} week(s), `
  if (day) ageStr += `${day} day(s), `
  if (hr) ageStr += `${hr} hour(s), `
  if (min) ageStr += `${min} minute(s), `
  if (sec) ageStr += `${sec} second(s), `

  return ageStr.substring(0, ageStr.length - 2)
}

const getDateTimeStr = dateStr => {
  const date = new Date(dateStr)
  return date.toLocaleString()
}

const getSecurityRulesPortRange = (min, max) => {
  if (min) {
    if (max && max !== min) return `${min} - ${max}`
    return String(min)
  } else if (max) return max
  return 'Any'
}

const formatSecurityRulesPortRange = (min, max) => {
  const result = getSecurityRulesPortRange(min, max)
  return (result === '22' ? '22 (SSH)' : result)
}
