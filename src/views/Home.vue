<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"/>
    <div>
      <button @click="handleClick('back')">返回上一页</button>
      <button @click="handleClick('push')">跳转到Argu</button>
      <button @click="handleClick('replace')">替换到Parent</button>
      <!--      <button @click="getInfo" :style="{ background: bgColor }">-->
      <!--        请求数据-->
      <!--      </button>-->
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from "../components/HelloWorld.vue";
  // import { getUserInfo } from "../api/user";

  export default {
    name: 'Home',
    data () {
      return {
        url: '',
        bgColor: ''
      }
    },
    // components: {
    //   HelloWorld
    // },
    methods: {
      handleClick (type) {
        if (type === 'back') {
          // this.$router.back();
          this.$router.go(-1)
        } else if (type === 'push') {
          const name = 'Nicole'
          this.$router.push({
            path: `/argu/${name}`

            // name: "Argu",
            // params: {
            //   name: "fillis"
            // }

            // path: "/argu",
            // query: {
            //   name: "fillis"
            // }
          })
        } else if (type === 'replace') this.$router.replace('./parent')
      }
      // getInfo() {
      //   getUserInfo({ userId: 21 }).then(res => {
      //     console.log("res: ", res);
      //     this.url = res.img;
      //     this.bgColor = res.color;
      //   });
      // }
    }
  }
</script>
