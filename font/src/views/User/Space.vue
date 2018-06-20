<template>
    <div class="space">
        <el-header>
            <el-button class="logout" @click="logout">登出</el-button>
        </el-header>
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
                        <el-button @click="delArticle(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
      return {
        tableData: [],
        user: {
            userId: "",
            base: ""
        },
        step: 10,
        page: 1
      }
    },
    methods: {
        getContent() {
            axios.post('/api/passage/fetch', {
                page: this.page,
                step: this.step,
                userId: this.user.userId
            })
            .then(res => {
                this.tableData = res.data.results
            })
        },
        readArticle(row) {
            this.$router.push(row.loc)
        },
        delArticle(row) {
            axios.post('/api/passage/del', {
                id: row.id
            })
            .then(res => {
                if (res.code == 0) {
                    let index = -1;
                    for(let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].id == row.id) {
                            index = i;
                            break;
                        }
                    }
                    if (index > -1) {
                        this.tableData.splice(index, 1)
                    }
                }
            })
        },
        logout() {
            axios.post('/api/user/logout', {
                userId: this.user.userId,
                base: this.user.base
            })
            .then(res => {
                if (res.data.code == 0) {
                    this.$alert('您已登出！', '提示', {
                        confirmButtonText: '确定'
                    })
                    this.$router.push('/user/login')
                }
            })
        },
        checkStatus() {
            if (window.sessionStorage.getItem('user_id') == null) {
                this.$alert('您还未登陆！', '提示', {
                    confirmButtonText: '确定'
                })
                this.$router.push('/user/login')
            }
        }
    },
    created() {
        this.checkStatus()
        this.user.userId = window.sessionStorage.getItem('user_id')
        this.user.base = window.sessionStorage.getItem('base')
        this.getContent()
    }
}
</script>
<style scoped>
.space {
    width: 100vw;
    height: 100vh;
    padding-top: 20px;
}
.username {
    color: #409EFF;
    font-family: "PingFang SC",Arial;
}
.logout {
    position: absolute;
    right: 50px;
    color: #409EFF;
    cursor: pointer;
}
.space-content {
    width: 80%;
    margin: 0 auto;
}
</style>

