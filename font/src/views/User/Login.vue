<template>
    <div class="page">
      <div class="pg-login">
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
import axios from "axios";
import sha256 from "sha256";
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
    alert(message, type) {
      this.$message({
        message,
        type,
        center: true,
        showClose: true
      });
    },
    submitForm() {
      axios
        .post("/api/user/login", {
          userId: this.formLabelAlign.userId,
          password: sha256(this.formLabelAlign.password)
        })
        .then(res => {
          let data = res.data;
          if (data.code === -1) {
            this.alert(data.msg, "warning");
            this.formLabelAlign.password = "";
          } else {
            window.sessionStorage.setItem("userId", this.formLabelAlign.userId);
            window.sessionStorage.setItem("base", data.results.base);
            this.$router.push({
              name: "space"
            });
          }
        })
        .catch(err => {
          this.alert("Please check your network", "error");
        });
    },
    resetForm() {
      this.formLabelAlign.password = "";
      this.formLabelAlign.userId = "";
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
.pg-login {
  width: 60%;
  text-align: center;
  margin: 0 auto;
}
.title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
}
@media screen and (max-width: 800px) {
  .pg-login {
    width: 100%;
    margin: 0;
  }
}
</style>

