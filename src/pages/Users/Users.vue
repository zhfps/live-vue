<template>
  <div class="Users">
    <el-card v-show="searchShow" class="tool-card">
      <el-form class="search" label-width="80px" :inline="true" :model="query">
        <el-form-item size="mini" label="用户名">
          <el-input v-model="query.userName" placeholder="用户名" />
        </el-form-item>
        <el-form-item size="mini" label="用户状态">
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
          border
          :stripe="true"
          :data="tableData"
          :max-height="tableMaxHeight"
          size="small"
          highlight-current-row
          @current-change="handleCurrentChange"
          @sort-change="handleSortChange"
        >
          <el-table-column
            type="index"
            width="50"
          />
          <el-table-column
            prop="username"
            label="用户名"
            sortable="custom"
            width="180"
          />
          <el-table-column
            prop="nickname"
            label="昵称"
            sortable="custom"
            width="180"
          />
          <el-table-column
            prop="roleName"
            label="角色"
            sortable="custom"
            width="180"
          />
          <el-table-column
            prop="icon"
            align="center"
            label="头像"
            width="80"
          >
            <template slot-scope="{row}">
              <el-avatar size="small" :src="rootPath + row.icon" />
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            width="180"
          />
          <el-table-column
            prop="telephone"
            label="移动电话"
            width="180"
          />
          <el-table-column
            prop="email"
            label="邮件"
            width="180"
          />
          <el-table-column
            prop="birthday"
            label="出生年月"
            sortable="custom"
            width="180"
          /> <el-table-column
            prop="sex"
            label="性别"
            width="180"
          />
          <el-table-column
            prop="status"
            label="状态"
            width="180"
          />
          <el-table-column
            prop="createTime"
            sortable="custom"
            label="注册时间"
            width="180"
          />
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          :current-page="query.currentPage"
          :page-sizes="pageSizeList"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
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
import './_Users.scss'
import '@/assets/styles/public.scss'
import { mapGetters } from 'vuex'
import { getUsers, getSelect, addMenu, updateMenu, deleteUser } from '@/api/module/common'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'Users',
  computed: {
    ...mapGetters([
      'rootPath',
      'pageSizeList'
    ])
  },
  data() {
    return {
      query: {
        userName: null,
        status: '全部',
        currentPage: 1,
        order: 'id',
        pageSize: 30,
        sortType: 1
      },
      tableMaxHeight: 500,
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
      total: 0,
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
  watch: {
    searchShow: function(n, o) {
      if (n) {
        this.tableMaxHeight = document.body.clientHeight - 220 - 135
      } else {
        this.tableMaxHeight = document.body.clientHeight - 127 - 135
      }
    }
  },
  created() {
    this.setTable()
    this.setSelect()
  },
  mounted() {
    this.$nextTick(() => {
      this.handleHeight()
    })
    window.onresize = () => {
      const divs = document.getElementsByClassName('table')
      this.tableMaxHeight = document.body.clientHeight - divs[0].offsetTop - 135
    }
  },
  methods: {
    handleSortChange(data) {
      if (data.order === 'ascending') {
        this.query.sortType = 2
      } else {
        this.query.sortType = 1
      }
      this.query.order = data.prop
      this.setTable()
    },
    handleHeight() {
      const divs = document.getElementsByClassName('table')
      this.tableMaxHeight = document.body.clientHeight - divs[0].offsetTop - 135
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.setTable()
    },
    handlePageChange(val) {
      this.query.currentPage = val
      this.setTable()
    },
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
      this.query.userName = null
      this.query.status = '全部'
      this.setTable()
    },
    handleRefresh() {
      this.setTable()
    },
    handleCurrentChange(val) {
      if (val != null) {
        this.update = val
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
        MessageBox.confirm(`确定删除${this.update.username ? this.update.username : '该'}用户吗？`).then(() => {
          deleteUser(this.update.id).then(res => {
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
      getUsers(this.query).then(res => {
        const { list, total } = res
        this.tableData = list
        this.total = total
        return res
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
