<template>
    <div class="page">
        <div class="pg-Login">
            <el-form label-position="right" label-width="80px" :model="formLabelAlign">
                <el-form-item>
                  <p class="title">OneBook</p>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="formLabelAlign.userId"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="formLabelAlign.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登录</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import sha256 from 'sha256'
export default {
  data() {
    return {
      formLabelAlign: {
        userId: "",
        password: ""
      }
    };
  },
  methods: {
    doLoginErr() {
        this.$alert('用户名或密码错误', '错误', {
          confirmButtonText: '确定'
        });
    },
    submitForm() {
      axios.post('/api/user/login', {
        userId: this.formLabelAlign.userId,
        password: sha256(this.formLabelAlign.password)
      })
      .then(res => {
        if(res.data.code == -1) {
          this.doLoginErr()
          this.resetForm()
        }
        else {
          console.log('login Ok')
          this.$router.push({
            name: 'space',
            params: {
              id: this.formLabelAlign.userId
            }
          })
        }
      })
      .catch(err => {
        console.log('login err')
      })
    },
    resetForm() {
      this.formLabelAlign.userId = ""
      this.formLabelAlign.password = ""
    }
  }
};
</script>
<style scoped>
.page {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.pg-Login {
  width: 30%;
  text-align: center;
  margin: 0 auto;
}
.title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
}
</style>

