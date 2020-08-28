<template>
  <Row class="vertical-center">
    <i-col :xs="{ span: 22, offset: 1 }" :sm="{ span: 22, offset: 1 }" :md="{ span: 12, offset: 6 }" :lg="{ span: 8, offset: 8 }">
      <Card>
        <div style="text-align: center">
          <img src="@/assets/img/openstack.png" alt="Openstack" class="openstack-img" />
        </div>
        <Form ref="loginForm" :model="formVals" :rules="rules" @keydown.native.enter.prevent="handleLogin">
          <Form-item prop="user" label="User Name">
            <Input type="text" v-model="formVals.user" placeholder="User Name">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="password" label="Password">
            <Input type="password" v-model="formVals.password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <br>
          <Form-item style="text-align: center">
            <Button type="primary" size="large" @click="handleLogin">Login</Button>
          </Form-item>
        </Form>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Login',
    data () {
      return {
        formVals: {
          user: '',
          password: ''
        },
        rules: {
          user: [
            { required: true, message: 'please enter your user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'please enter your password', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      handleLogin () {
        try {
          this.$refs.loginForm.validate(async valid => {
            if (valid) {
              await this.login({
                userName: this.formVals.user,
                password: this.formVals.password,
                loginView: this
              })
            }
          })
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style lang="less">
  .vertical-center {
    padding-top: ~"calc((100vh - 457.266px) * 0.4)";

    .openstack-img {
      max-width: 65%;
      margin: 16px 10px;
    }
  }
</style>
