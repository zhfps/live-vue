<template>
  <div class="MenuPage">
    <el-card class="tool-card">
      <el-form label-width="80px" :inline="true" :model="query">
        <el-form-item size="mini" label="菜单名称">
          <el-input v-model="query.name" placeholder="菜单名称" />
        </el-form-item>
        <el-form-item size="mini" label="菜单状态">
          <el-select v-model="query.status" size="mini" placeholder="菜单状态">
            <el-option label="全部" value="全部" />
            <el-option label="禁用" value="禁用" />
            <el-option label="启用" value="启用" />
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" icon="el-icon-search" round @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="warning" icon="el-icon-refresh" round @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table-content">
      <el-row class="nav-bar">
        <el-button type="primary" size="mini">新增</el-button>
        <el-button type="warning" size="mini">修改</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </el-row>
      <div class="table">
        <el-table
          style="width: 100%"
          :data="tableData"
          row-key="id"
          border
          :stripe="true"
          :max-height="550"
          :expand-row-keys="[1,2,3]"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column
            label="菜单名称"
            width="180"
          >
            <template slot-scope="{row}">
              <span>{{ row.meta.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="图标"
            width="180"
          >
            <template slot-scope="{row}">
              <svg-icon
                class="pre-icon"
                :name="row.meta.icon"
                width="18"
                height="18"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            width="180"
          />
          <el-table-column
            prop="path"
            label="请求地址"
            width="300"
          />
          <el-table-column
            prop="status"
            label="状态"
            width="160"
          />
          <el-table-column
            prop="directory"
            label="类型"
            width="160"
          />
          <el-table-column
            prop="permission"
            label="权限标识"
            width="300"
          />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import './_MenuPage.scss'
import { getTable } from '@/api/module/common'

export default {
  name: 'MenuPage',
  data() {
    return {
      query: {
        name: '',
        status: '全部'
      },
      tableData: []
    }
  },
  created() {
    this.setTable()
  },
  methods: {
    search() {
      this.setTable()
    },
    reset() {
      this.query = {
        name: '',
        status: '全部'
      }
      this.setTable()
    },
    setTable() {
      new Promise((resolve, reject) => {
        getTable(this.query).then(res => {
          this.tableData = res
          resolve(res)
        }).catch(err => reject(err))
      })
    }
  }
}
</script>
