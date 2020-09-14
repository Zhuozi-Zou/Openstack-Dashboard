import bus from '@/lib/bus'

export const instancesCol = [
  {
    type: 'selection',
    width: 52,
    align: 'center'
  },
  {
    key: 'name',
    title: 'Instance Name',
    minWidth: 140,
    sortable: true
  },
  {
    key: 'image_name',
    title: 'Image Name',
    minWidth: 126,
    sortable: true
  },
  {
    key: 'ip_address',
    title: 'IP Address',
    minWidth: 178,
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
    minWidth: 130,
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
    minWidth: 110,
    sortable: true
  },
  {
    key: 'actions',
    title: 'Actions',
    width: 125,
    align: 'center',
    render: (h, { row }) => {
      const running = row['OS-EXT-STS:power_state'] === 'Running'
      return (
        <Dropdown trigger="click" transfer={ true } on-on-click={ (name) => bus.$emit('on-instances-dropdown-click', name) }>
          <i-button>
            Select
            <Icon type="md-arrow-dropdown" style="margin-left: 8px" />
          </i-button>
          <Dropdown-menu slot="list">
            { !running && <Dropdown-item name="start_instance">Start Instance</Dropdown-item> }
            { !running && <Dropdown-item name="create_snapshot">Create Snapshot</Dropdown-item> }
            <Dropdown-item style="color: red" name="disassociate_floating_ip">Disassociate Floating IP</Dropdown-item>
            <Dropdown-item name="attach_interface">Attach Interface</Dropdown-item>
            <Dropdown-item name="detach_interface">Detach Interface</Dropdown-item>
            <Dropdown-item name="edit_instance">Edit Instance</Dropdown-item>
            <Dropdown-item name="update_metadata">Update Metadata</Dropdown-item>
            { running && <Dropdown-item name="edit_security_groups">Edit Security Groups</Dropdown-item> }
            <Dropdown-item name="edit_port_security_groups">Edit Port Security Groups</Dropdown-item>
            { running && <Dropdown-item name="console">Console</Dropdown-item> }
            { running && <Dropdown-item name="view_log">View Log</Dropdown-item> }
            { running && <Dropdown-item name="rescue_instance">Rescue Instance</Dropdown-item> }
            { running && <Dropdown-item name="pause_instance">Pause Instance</Dropdown-item> }
            { running && <Dropdown-item name="suspend_instance">Suspend Instance</Dropdown-item> }
            <Dropdown-item name="shelve_instance">Shelve Instance</Dropdown-item>
            <Dropdown-item style="color: red" name="resize_instance">Resize Instance</Dropdown-item>
            <Dropdown-item name="lock_instance">Lock Instance</Dropdown-item>
            { running && <Dropdown-item style="color: red" name="soft_reboot_instance">Soft Reboot Instance</Dropdown-item> }
            <Dropdown-item style="color: red" name="hard_reboot_instance">Hard Reboot Instance</Dropdown-item>
            { running && <Dropdown-item style="color: red" name="shut_off_instance">Shut Off Instance</Dropdown-item> }
            <Dropdown-item style="color: red" name="rebuild_instance">Rebuild Instance</Dropdown-item>
            <Dropdown-item style="color: red" name="delete_instance">Delete Instance</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      )
    }
  }
]
