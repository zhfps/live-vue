<template>
  <div class="MenuPage">
    <el-card class="tool-card">
      <el-form :inline="true" :model="query">
        <el-form-item size="mini" label="菜单名称">
          <el-input v-model="query.name" placeholder="菜单名称" />
        </el-form-item>
        <el-form-item size="mini" label="菜单状态">
          <el-select v-model="query.status" size="mini" placeholder="菜单状态">
            <el-option label="禁用" value="禁用" />
            <el-option label="启用" value="启用" />
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="warning" icon="el-icon-refresh" round>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="content">
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
        :stripe="true"
        :max-height="550"
        :expand-row-keys="[1,2,3]"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          label="菜单名称"
          width="180"
        >
          <template slot-scope="{row}">
            <span>{{ row.meta.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
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
        name: null,
        status: '启用'
      },
      tableData: []
    }
  },
  created() {
    this.setTable()
  },
  methods: {
    setTable() {
      new Promise((resolve, reject) => {
        getTable().then(res => {
          this.tableData = res
          resolve(res)
        }).catch(err => reject(err))
      })
    }
  }
}
</script>
