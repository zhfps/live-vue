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
        <el-button type="primary" size="mini" @click="handleRole">角色分配</el-button>
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
      <el-form ref="menuForm" label-width="80px" :rules="rules" :model="user" style="padding-right: 15px;">
        <el-form-item prop="username" size="mini" label="用户名">
          <el-input v-model="user.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="nickname" size="mini" label="昵称">
          <el-input v-model="user.nickname" placeholder="昵称" />
        </el-form-item>
        <el-form-item prop="password" size="mini" label="密码">
          <el-input v-model="user.password" type="password" placeholder="密码" />
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
        <el-form-item prop="username" size="mini" label="用户名">
          <el-input v-model="update.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="nickname" size="mini" label="昵称">
          <el-input v-model="update.nickname" placeholder="昵称" />
        </el-form-item>
        <el-form-item prop="password" size="mini" label="密码">
          <el-input v-model="update.password" type="password" placeholder="密码" />
        </el-form-item>
      </el-form>
      <span slot="footer" style="text-align: right;">
        <el-button type="primary" size="mini" @click="handleUpdate('updateForm')">确定</el-button>
        <el-button size="mini" @click="handleCancle('update')">取消</el-button>
      </span>
    </el-dialog>
    <!--分配角色-->
    <el-dialog
      v-dialog-drag
      title="分配角色"
      :visible.sync="roleShow"
      width="400px"
    >
      <el-tree
        ref="tree"
        :data="roles"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="setRoles"
        @check="handleSelectNode"
      />
      <span slot="footer" style="text-align: right;">
        <el-button type="primary" size="mini" @click="handleSetRole">确定</el-button>
        <el-button size="mini" @click="roleShow = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import './_Users.scss'
import '@/assets/styles/public.scss'
import { mapGetters } from 'vuex'
import {
  getUsers,
  CreateUser,
  UpdateUser,
  deleteUser,
  getUserRoles,
  setUserRole,
  getAllRoles
} from '@/api/module/common'
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
      roleShow: false,
      roles: [],
      setRoles: [],
      defaultProps: {
        children: 'children',
        label: 'description'
      },
      query: {
        userName: null,
        status: '全部',
        currentPage: 1,
        order: 'id',
        pageSize: 30,
        sortType: 1
      },
      tableMaxHeight: 500,
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      total: 0,
      update: {},
      show: false,
      updateShow: false,
      tableData: [],
      searchShow: false,
      options: [],
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
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
    this.handleGetAllRoles()
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
    handleGetAllRoles() {
      getAllRoles().then(res => {
        this.roles = res
      })
    },
    handleSetRole() {
      setUserRole(this.update.id, this.setRoles).then(res => {
        if (res) {
          this.setRoles = []
          this.roleShow = false
        }
      })
    },
    handleRole() {
      if (Object.keys(this.update).length > 0) {
        this.handleGetRoles()
      } else {
        Message({
          type: 'info',
          message: '请选择数据',
          showClose: true
        })
      }
    },
    handleGetRoles() {
      this.setRoles = []
      getUserRoles(this.update.id).then(res => {
        for (const item of res) {
          this.setRoles.push(item.userId)
        }
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.setRoles)
        })
        this.roleShow = true
        return res
      })
    },
    handleSelectNode(Nodes, Keys) {
      this.setRoles = Keys.checkedKeys
    },
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
        this.user = {
          username: '',
          nickname: '',
          password: ''
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
            CreateUser(this.user).then(res => {
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
            UpdateUser(this.update).then(res => {
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
    }
  }
}
</script>
