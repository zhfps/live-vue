<template>
  <div class="Menus">
    <el-card v-show="searchShow" class="tool-card">
      <el-form class="search" label-width="80px" :inline="true" :model="query">
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
        <el-button type="primary" size="mini" @click="show =!show">新增</el-button>
        <el-button type="warning" size="mini" @click="handleUpdateDialog">修改</el-button>
        <el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
        <el-button-group style="float: right;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="searchShow = !searchShow" />
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="handleRefresh" />
        </el-button-group>
      </el-row>
      <div class="table">
        <el-table
          style="width: 100%"
          row-key="id"
          border
          :stripe="true"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
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
    <!--新增-->
    <el-dialog
      v-dialog-drag
      title="新增"
      :visible.sync="show"
      width="400px"
    >
      <el-form ref="menuForm" label-width="80px" :rules="rules" :model="menu" style="padding-right: 15px;">
        <el-form-item size="mini" label="父节点">
          <el-cascader
            v-model="menu.parentId"
            style="width: 100%;"
            :options="options"
            :props="{ checkStrictly: true, emitPath: false}"
            clearable
          />
        </el-form-item>
        <el-form-item size="mini" label="菜单名称">
          <el-input v-model="menu.title" placeholder="菜单名称" />
        </el-form-item>
        <el-form-item size="mini" label="路径">
          <el-input v-model="menu.path" placeholder="路径" />
        </el-form-item>
        <el-form-item prop="name" size="mini" label="组件名称">
          <el-input v-model="menu.name" placeholder="前端页面名称" />
        </el-form-item>
        <el-form-item size="mini" label="图标">
          <el-input v-model="menu.icon" placeholder="图标" />
        </el-form-item>
        <el-form-item size="mini" label="权限标识">
          <el-input v-model="menu.permission" placeholder="权限标识" />
        </el-form-item>
        <el-form-item size="mini" label="序号">
          <el-input v-model="menu.sort" placeholder="序号" />
        </el-form-item>
        <el-form-item size="mini" label="菜单状态">
          <el-select v-model="menu.status" size="mini" style="width: 100%;" placeholder="菜单状态">
            <el-option label="禁用" value="禁用" />
            <el-option label="启用" value="启用" />
          </el-select>
        </el-form-item>
        <el-form-item size="mini" label="菜单类型">
          <el-select v-model="menu.directory" size="mini" style="width: 100%;" placeholder="菜单类型">
            <el-option label="目录" value="目录" />
            <el-option label="页面" value="页面" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" style="text-align: right;">
        <el-button type="primary" size="mini" @click="onSubmit('menuForm')">确定</el-button>
        <el-button size="mini" @click="handleCancle('create')">取消</el-button>
      </span>
    </el-dialog>
    <!--修改菜单-->
    <el-dialog
      v-dialog-drag
      title="修改"
      :visible.sync="updateShow"
      width="400px"
    >
      <el-form ref="updateForm" label-width="80px" :rules="rules" :model="update" style="padding-right: 15px;">
        <el-form-item size="mini" label="父节点">
          <el-cascader
            v-model="update.parentId"
            style="width: 100%;"
            :options="options"
            :props="{ checkStrictly: true, emitPath: false}"
            clearable
          />
        </el-form-item>
        <el-form-item size="mini" label="菜单名称">
          <el-input v-model="update.title" placeholder="菜单名称" />
        </el-form-item>
        <el-form-item size="mini" label="路径">
          <el-input v-model="update.path" placeholder="路径" />
        </el-form-item>
        <el-form-item prop="name" size="mini" label="组件名称">
          <el-input v-model="update.name" placeholder="前端页面名称" />
        </el-form-item>
        <el-form-item size="mini" label="图标">
          <el-input v-model="update.icon" placeholder="图标" />
        </el-form-item>
        <el-form-item size="mini" label="权限标识">
          <el-input v-model="update.permission" placeholder="权限标识" />
        </el-form-item>
        <el-form-item size="mini" label="序号">
          <el-input v-model="update.sort" placeholder="序号" />
        </el-form-item>
        <el-form-item size="mini" label="菜单状态">
          <el-select v-model="update.status" size="mini" style="width: 100%;" placeholder="菜单状态">
            <el-option label="禁用" value="禁用" />
            <el-option label="启用" value="启用" />
          </el-select>
        </el-form-item>
        <el-form-item size="mini" label="菜单类型">
          <el-select v-model="update.directory" size="mini" style="width: 100%;" placeholder="菜单类型">
            <el-option label="目录" value="目录" />
            <el-option label="页面" value="页面" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" style="text-align: right;">
        <el-button type="primary" size="mini" @click="handleUpdate('updateForm')">确定</el-button>
        <el-button size="mini" @click="handleCancle('update')">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import './Menus.scss'
import '@/assets/styles/public.scss'
import { getTable, getSelect, addMenu, updateMenu, updateDelete } from '@/api/module/common'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'Users',
  data() {
    return {
      query: {
        name: '',
        status: '全部'
      },
      menu: {
        id: '',
        parentId: '',
        name: '',
        permission: '',
        sort: '',
        status: '',
        directory: '',
        title: '',
        path: ''
      },
      update: {},
      show: false,
      updateShow: false,
      tableData: [],
      searchShow: false,
      options: [],
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.setTable()
    this.setSelect()
  },
  methods: {
    handleCancle(type) {
      if (type === 'update') {
        this.updateShow = false
        this.update = {
          id: 0
        }
      } else if (type === 'create') {
        this.show = false
        this.menu = {
          id: '',
          parentId: '',
          name: '',
          permission: '',
          sort: '',
          status: '',
          directory: '',
          title: '',
          path: ''
        }
      }
    },
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
    handleRefresh() {
      this.setTable()
    },
    handleCurrentChange(val) {
      if (val != null) {
        this.update = (({ id,
          parentId,
          name,
          permission,
          sort,
          status,
          directory,
          path }) => ({ id,
          parentId,
          name,
          permission,
          sort,
          status,
          directory,
          path }))(val)
        this.update.title = val.meta.title
        this.update.icon = val.meta.icon
      }
    },
    handleUpdateDialog() {
      if (Object.keys(this.update).length > 0) {
        this.updateShow = true
      } else {
        Message({
          type: 'info',
          message: '请选择数据',
          showClose: true
        })
      }
    },
    onSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return false
        } else {
          new Promise((resolve, reject) => {
            addMenu(this.menu).then(res => {
              if (res) {
                this.setTable()
                Message({
                  type: 'success',
                  message: '新增成功',
                  showClose: true
                })
                this.show = false
                resolve(res)
              }
            }).catch(err => reject(err))
          })
        }
      })
    },
    handleUpdate(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return false
        } else {
          new Promise((resolve, reject) => {
            updateMenu(this.update).then(res => {
              if (res) {
                this.setTable()
                Message({
                  type: 'success',
                  message: '修改成功',
                  showClose: true
                })
                this.updateShow = false
                resolve(res)
              }
            }).catch(err => reject(err))
          })
        }
      })
    },
    handleDelete() {
      if (Object.keys(this.update).length > 0) {
        MessageBox.confirm(`确定删除${this.update.title ? this.update.title : '该'}菜单吗？`).then(() => {
          updateDelete(this.update.id).then(res => {
            if (res) {
              Message({
                type: 'success',
                message: '删除',
                showClose: true
              })
              this.setTable()
            }
          })
        })
      } else {
        Message({
          type: 'info',
          message: '请选择数据',
          showClose: true
        })
      }
    },
    setTable() {
      new Promise((resolve, reject) => {
        getTable(this.query).then(res => {
          this.tableData = res
          resolve(res)
        }).catch(err => reject(err))
      })
    },
    setSelect() {
      new Promise((resolve, reject) => {
        getSelect().then(res => {
          this.options = res
          resolve(res)
        }).catch(err => reject(err))
      })
    }
  }
}
</script>
