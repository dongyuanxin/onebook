<template>
    <div class="space">
        <el-header>
            <p class="username">用户: {{user.userId}}</p>
            <p class="logout" @click="logout">登出</p>
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
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
            userId: "pengrunbin"
        }
      }
    },
    methods: {
        getContent() {
            // 测试数据
            axios.get("https://easy-mock.com/mock/5b25fd3c0f6ae915edc0fba0/user/space")
            .then((res) => {
                this.tableData = res.data.data.tableData
            })

            axios.post('/api/passage/fetch', {
                page: 2,
                step: 1,
                userId: 'test'
            })
            .then(res => {
                console.log(res.data)
            })
        },
        handleClick(row) {
            console.log(row.id);
        },
        delArticle(row) {
            axios.post('/api/passage/del', {
                id: row.id
            })
        },
        logout() {
            console.log('logout')
        },
        checkStatus() {

        }
    },
    mounted() {
        this.user.userId = this.$route.params.id
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

