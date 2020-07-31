<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu v-show="!collapsed" width="auto" theme="dark" @on-select="handleSelect">
      <template v-for="item in list">
        <re-submenu
          v-if="item.children"
          :key="`menu_${item.name}`"
          :name="item.name"
          :parent="item"
        >
        </re-submenu>
        <menu-item v-else :key="`menu_${item.name}`" :name="item.name">
          <Icon :type="item.icon" />
          {{ item.title }}
        </menu-item>
      </template>
    </Menu>
  </div>
</template>

<script>
  import ReSubmenu from './re-submenu.vue'
  // import { mapState } from "vuex";
  // import { getOpenArrByName } from "@/lib/util";
  export default {
    name: 'SideMenu',
    components: {
      ReSubmenu
    },
    props: {
      collapsed: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: () => []
      }
    },
    // computed: {
    //   ...mapState({
    //     routers: state => state.router.routers
    //   }),
    //   openNames() {
    //     return getOpenArrByName(this.$route.name, this.routers);
    //   }
    // },
    // watch: {
    //   openNames() {
    //     this.$nextTick(() => {
    //       this.$refs.menu.updateOpened();
    //     });
    //   }
    // },
    methods: {
      handleSelect (name) {
        this.$router.push({
          name
        })
      },
      handleClick (name) {
        console.log(name)
      }
    }
  }
</script>

<style lang="less">
  .side-menu-wrapper {
    width: 100%;

    .ivu-tooltip,
    .drop-menu-span {
      display: block;
      width: 100%;
      text-align: center;
      padding: 5px 0;
    }

    .drop-wrapper > .ivu-dropdown {
      display: block;
      padding: 5px;
      margin: 0 auto;
    }

    .ivu-menu-submenu-title > i {
      margin-right: 6px;
    }

    .ivu-icon {
      height: 16px;
      width: 18px;
    }
  }
</style>
