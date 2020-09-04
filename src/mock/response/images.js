import bus from '@/lib/bus'
import ExpandRow from '_c/table-expand'

export const imagesCol = [
  {
    type: 'selection',
    width: 50,
    align: 'center'
  },
  {
    type: 'expand',
    width: 10,
    render: (h, { row }) => {
      return h(ExpandRow, {
        props: {
          row: [
            {
              title: 'Name',
              value: row.name
            },
            {
              title: 'Visibility',
              value: row.visibility
            },
            {
              title: 'Min. Disk',
              value: row.min_disk
            },
            {
              title: 'ID',
              value: row.id
            },
            {
              title: 'Protected',
              value: row.protected
            },
            {
              title: 'Min.RAM',
              value: row.min_ram
            }]
        }
      })
    }
  },
  {
    key: 'owner_project_name',
    title: 'Owner',
    minWidth: 120,
    sortable: true
  },
  {
    key: 'name',
    title: 'Name',
    minWidth: 120,
    sortable: true
  },
  {
    key: 'image_type',
    title: 'Type',
    width: 100,
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    width: 92,
    sortable: true
  },
  {
    key: 'visibility',
    title: 'Visibility',
    width: 104,
    sortable: true
  },
  {
    key: 'protected',
    title: 'Protected',
    width: 110,
    sortable: true
  },
  {
    key: 'disk_format',
    title: 'Disk Format',
    width: 124,
    sortable: true
  },
  {
    key: 'size',
    title: 'Size',
    width: 100,
    sortable: true
  },
  {
    key: 'actions',
    title: 'Actions',
    width: 140,
    align: 'center',
    render: (h, { row }) => {
      return (
        <Dropdown trigger="click" transfer={ true } on-on-click={ (name) => bus.$emit('on-images-dropdown-click', name) }>
          <i-button>
            Select
            <Icon type="md-arrow-dropdown" style="margin-left: 8px" />
          </i-button>
          <Dropdown-menu slot="list">
            <Dropdown-item name="launch">Launch</Dropdown-item>
            <Dropdown-item name="create_volume">Create Volume</Dropdown-item>
            <Dropdown-item name="edit_image">Edit Image</Dropdown-item>
            <Dropdown-item name="update_metadata">Update Metadata</Dropdown-item>
            <Dropdown-item style="color: red" name="delete_image">Delete Image</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      )
    }
  }
]
