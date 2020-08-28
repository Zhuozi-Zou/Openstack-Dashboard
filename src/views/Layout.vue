<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider
        collapsible
        hide-trigger
        v-model="collapsed"
        breakpoint="sm"
        class="sider-outer"
        :style="{ 'min-width': collapsed ? '0' : '220px' }"
      >
        <side-menu :collapsed="collapsed" :list="list"></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon
            :class="triggerClasses"
            @click.native="handleCollapsed"
            type="md-menu"
            :size="32"
          />
        </Header>
        <Content class="content-con">
<!--          <div>-->
<!--            <Tabs type="card" @on-click="handleClickTab" :value="getTabNameByRoute($route)">-->
<!--              <TabPane :label="labelRender(item)" :name="getTabNameByRoute(item)" v-for="(item, index) in tabList" :key="`tabNav${index}`"></TabPane>-->
<!--            </Tabs>-->
<!--          </div>-->
          <div class="view-box">
            <Card shadow class="page-card">
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
  // import { mapState, mapMutations, mapActions } from 'vuex'
  // import { getTabNameByRoute, getRouteById } from '@/lib/util';

  export default {
    components: {
      SideMenu
    },
    data () {
      return {
        collapsed: false,
        // getTabNameByRoute
        list: [
          {
            title: 'Project',
            name: 'Project',
            icon: 'md-filing',
            children: [
              {
                title: 'Compute',
                name: 'Compute',
                icon: 'md-analytics',
                children: [
                  {
                    title: 'Instances',
                    name: 'Instances',
                    icon: 'md-desktop'
                  },
                  {
                    title: 'Images',
                    name: 'Images',
                    icon: 'md-copy'
                  },
                  {
                    title: 'Key Pairs',
                    name: 'Key_Pairs',
                    icon: 'md-key'
                  }
                ]
              },
              {
                title: 'Network',
                name: 'Network',
                icon: 'md-globe',
                children: [
                  {
                    title: 'Networks',
                    name: 'Networks',
                    icon: 'md-pulse'
                  },
                  {
                    title: 'Routers',
                    name: 'Routers',
                    icon: 'md-shuffle'
                  },
                  {
                    title: 'Security Groups',
                    name: 'Security_Groups',
                    icon: 'md-lock'
                  },
                  {
                    title: 'Floating IPs',
                    name: 'Floating_Ips',
                    icon: 'md-locate'
                  }
                ]
              }
            ]
          },
          {
            title: 'Admin',
            name: 'Admin',
            icon: 'md-person',
            children: [
              {
                title: 'Overview',
                name: 'Overview',
                icon: 'md-map'
              }
            ]
          }
        ]
      }
    },
    computed: {
      triggerClasses () {
        return ['trigger-icon', this.collapsed ? 'rotate' : '']
      }
      // ...mapState({
      //   tabList: state => state.tabNav.tabList,
      //   routers: state => state.router.routers.filter(item => {
      //     return item.path !== '*' && item.name !== 'login'
      //   })
      // })
    },
    methods: {
      // ...mapActions([
      //   'handleRemove'
      // ]),
      handleCollapsed () {
        this.collapsed = !this.collapsed
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
      background: #fff;
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
      padding: 16px 23px;

      .trigger-icon {
        cursor: pointer;
        transition: transform 0.3s ease;
        float: left;

        &.rotate {
          transform: rotateZ(-90deg);
          transition: transform 0.3s ease;
        }
      }
    }

    .sider-outer {
      height: 100%;
      overflow: hidden;
      .ivu-layout-sider-children {
        margin-right: -20px;
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
