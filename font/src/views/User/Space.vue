<template>
    <div class="space">
      <div class="space-header">
        <el-button @click="logout">登出</el-button>
      </div>
      <div class="space-content">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="createTime" label="创建日期" width="180">
            </el-table-column>
            <el-table-column prop="updateTime" label="最近更新" width="180">
            </el-table-column>
            <el-table-column prop="title" label="文章标题">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="readArticle(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="delArticle(scope)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      userId: "",
      base: "",
      step: 30,
      page: 1
    };
  },
  mounted() {
    this.userId = window.sessionStorage.getItem("userId");
    this.base = window.sessionStorage.getItem("base");
    this.checkStatus()
      .then(_ => {
        this.getContent();
      })
      .catch(error => {
        this.alert(error.message, "warning");
        this.$router.push({
          name: "login"
        });
      });
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
    checkStatus() {
      const promise = new Promise((resolve, reject) => {
        if (this.userId === "" || this.base === "") {
          reject(new Error("User not login"));
        }
        axios
          .post("/api/user/check", {
            userId: this.userId,
            base: this.base
          })
          .then(res => {
            let data = res.data;
            if (data.code !== 0) reject(new Error(data.msg));
            else resolve(true);
          })
          .catch(error => reject(error));
      });
      return promise;
    },
    getContent() {
      axios
        .post("/api/passage/fetch", {
          page: this.page,
          step: this.step,
          userId: this.userId
        })
        .then(res => {
          this.tableData = res.data.results;
        });
    },
    readArticle(row) {
      this.$router.push(row.loc);
    },
    delArticle(scope) {
      axios
        .post("/api/passage/del", {
          id: scope.row.id
        })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData.splice(scope.$index, 1);
            this.alert("Delete success", "success");
          } else {
            this.alert(res.msg, "error");
          }
        })
        .catch(error => {
          this.alert(error.message, "error");
        });
    },
    logout() {
      axios
        .post("/api/user/logout", {
          userId: this.userId,
          base: this.base
        })
        .then(res => {
          if (res.data.code == 0) {
            this.alert("Logout", "success");
            window.sessionStorage.setItem("userId", "");
            window.sessionStorage.setItem("base", "");
            this.$router.push({
              name: "login"
            });
          }
        });
    }
  }
};
</script>
<style scoped>
.space {
  width: 100%;
  padding-top: 20px;
}
.space-header {
  text-align: center;
}
.username {
  color: #409eff;
  font-family: "PingFang SC", Arial;
}
.space-content {
  width: 80%;
  margin: 0 auto;
}
</style>

