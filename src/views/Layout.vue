<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider
        collapsible
        hide-trigger
        v-model="collapsed"
        breakpoint="sm"
        class="sider-outer"
        :style="{ 'min-width': collapsed ? '0' : '220px', position: 'fixed' }"
      >
        <side-menu :collapsed="collapsed" :list="menus"></side-menu>
      </Sider>
      <Layout :style="{ marginLeft: collapsed ? '64px' : '220px' }">
        <Header class="header-wrapper">
          <Icon
            :class="triggerClasses"
            @click.native="handleCollapse"
            type="md-menu"
            :size="32"
          />
          <Breadcrumb class="header-breadcrumb">
            <BreadcrumbItem v-for="(item, index) in breadcrumbVals" :key="`${_uid}_${index}`" :to="{ name: item.to }">
              {{ item.text }}
            </BreadcrumbItem>
          </Breadcrumb>
          <Button type="error" class="logout-button" @click="handleLogout">Logout</Button>
        </Header>
        <Content class="content-con">
<!--          <div>-->
<!--            <Tabs type="card" @on-click="handleClickTab" :value="getTabNameByRoute($route)">-->
<!--              <TabPane :label="labelRender(item)" :name="getTabNameByRoute(item)" v-for="(item, index) in tabList" :key="`tabNav${index}`"></TabPane>-->
<!--            </Tabs>-->
<!--          </div>-->
          <div class="view-box">
            <Card shadow class="page-card" style="background-color: mintcream">
              <router-view />
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import SideMenu from '../components/side-menu'
  import { mapState } from 'vuex'
  import { setTokenToCookie, pathToText } from '@/lib/util'

  export default {
    components: {
      SideMenu
    },
    data () {
      return {
        collapsed: false
        // getTabNameByRoute
      }
    },
    computed: {
      ...mapState({
        // tabList: state => state.tabNav.tabList,
        menus: state => state.router.routers.filter(item => {
          return item.path !== '*' && item.name !== 'login' && item.name !== 'index'
        })
      }),
      triggerClasses () {
        return ['trigger-icon', this.collapsed ? 'rotate' : '']
      },
      breadcrumbVals () {
        let path = this.$route.fullPath
        if (path !== '/home' && path !== '/') path = '/home' + path
        return path.split('/').map(item => {
          return {
            text: pathToText(item),
            to: item
          }
        })
      }
    },
    methods: {
      // ...mapActions([
      //   'handleRemove'
      // ]),
      handleCollapse () {
        this.collapsed = !this.collapsed
      },
      handleLogout () {
        setTokenToCookie('')
        setTokenToCookie('', 'login')
        this.$router.push({ name: 'login' })
      }
      // handleClickTab(id) {
      //   let route = getRouteById(id);
      //   this.$router.push(route);
      // },
      // handleTabRemove(id, event) {
      //   event.stopPropagation();
      //   this.handleRemove({
      //     id,
      //     $route: this.$route
      //   }).then(nextRoute => {
      //     this.$router.push(nextRoute);
      //   });
      // },
      // labelRender(item) {
      //   return h => {
      //     return (
      //       <div>
      //       <span>{item.meta.title}</span>
      //       <icon nativeOn-click={this.handleTabRemove.bind(this, getTabNameByRoute(item))} type="md-close-circle" style="line-height:10px;"></icon>
      //       </div>
      //     )
      //   };
      // }
    }
  }
</script>

<style lang="less">
  .layout-wrapper,
  .layout-outer {
    height: 100%;

    .header-wrapper {
      background: rgba(250, 250, 250);
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
      padding: 0 23px;

      .trigger-icon {
        cursor: pointer;
        transition: transform 0.3s ease;
        float: left;
        margin-top: 16px;
        margin-right: 10px;

        &.rotate {
          transform: rotateZ(-90deg);
          transition: transform 0.3s ease;
        }
      }

      .header-breadcrumb {
        display: inline;
        font-size: 15px;

        .ivu-breadcrumb-item-separator {
          color: #657180;
        }
      }

      .logout-button {
        float: right;
        margin-top: 16px;
      }
    }

    .sider-outer {
      height: 100%;
      overflow: hidden;
      background-color: #fff;
      .ivu-layout-sider-children {
        margin-right: -15px;
        overflow-y: scroll;
        overflow-x: hidden;
      }
    }

    .content-con {
      padding: 10px;
      /*.ivu-tabs-bar {*/
      /*  margin-bottom: 0;*/
      /*}*/
      /*.view-box {*/
      /*  padding: 0;*/
      /*}*/
    }

    .page-card {
      min-height: ~"calc(100vh - 84px)";
    }
  }
</style>
