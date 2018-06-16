<template>
  <div>
    <i class="iconfont icon-sort" @click="showCatalogue = !showCatalogue"></i>
    <el-dialog title="目录" :visible.sync="showCatalogue" width="80%">
      <el-tree :data="treeData" :props="treeProps" @node-click="handleNodeClick"></el-tree>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    summary: {
      type: Object,
      required: false,
      default: {}
    }
  },
  data() {
    return {
      showCatalogue: false,
      treeProps: {
        children: "children",
        label: "label"
      },
      treeData: []
    };
  },
  watch: {
    summary: {
      handler: function(val, oldVal) {
        this.treeData = [];
        this.convertSummaryToTreeData(val, this.treeData, "");
      },
      deep: true
    },
    $route(to, from) {
      this.showCatalogue = false;
    }
  },
  methods: {
    handleNodeClick(data) {
      if (data.hasOwnProperty("psgId")) {
        let { platform, user, depository } = this.$route.params;
        this.$router.push({
          name: "book",
          params: {
            platform,
            user,
            depository
          },
          query: {
            psgId: data.psgId
          }
        });
      }
    },
    convertSummaryToTreeData(summary, treeData, prefix) {
      let keys = Object.keys(summary);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i],
          raw = summary[key];
        if (raw instanceof Array) {
          treeData.push({
            label: key,
            children: raw.map(item => {
              return {
                label: item,
                psgId: prefix + key + "*" + item
              };
            })
          });
        } else if (typeof raw === "object") {
          treeData.push({
            label: key,
            children: []
          });
          this.convertSummaryToTreeData(
            raw,
            treeData[i].children,
            prefix + key + "*"
          );
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont.icon-sort {
  display: block;
  position: fixed;
  left: 5px;
  top: 5px;
  text-align: center;
  font-size: 1.3em;
  padding: 3px;
  border-radius: 3px;
  color: white;
  background-color: #222;
  cursor: pointer;
}
</style>
