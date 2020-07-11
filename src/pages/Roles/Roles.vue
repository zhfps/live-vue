<template>
  <div class="Roles">
    <el-card v-show="searchShow" class="tool-card">
      <el-form class="search" label-width="80px" :inline="true" :model="query">
        <el-form-item size="mini" label="权限描述">
          <el-input v-model="query.description" placeholder="权限描述" />
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
        <el-button type="primary" size="mini">权限分配</el-button>
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
            prop="name"
            label="权限名"
            sortable="custom"
            width="180"
          />
          <el-table-column
            prop="description"
            label="描述"
            sortable="custom"
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
      <el-form ref="menuForm" label-width="80px" :rules="rules" :model="role" style="padding-right: 15px;">
        <el-form-item prop="name" size="mini" label="用户名">
          <el-input v-model="role.name" placeholder="角色编号" />
        </el-form-item>
        <el-form-item prop="description" size="mini" label="角色描述">
          <el-input v-model="role.description" placeholder="角色描述" />
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
        <el-form-item prop="description" size="mini" label="角色描述">
          <el-input v-model="update.description" placeholder="角色描述" />
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
import './_Roles.scss'
import '@/assets/styles/public.scss'
import { mapGetters } from 'vuex'
import { getRoles, CreateRole, UpdateRole, deleteRole } from '@/api/module/common'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'Roles',
  computed: {
    ...mapGetters([
      'rootPath',
      'pageSizeList'
    ])
  },
  data() {
    return {
      query: {
        description: null,
        currentPage: 1,
        order: 'id',
        pageSize: 30,
        sortType: 1
      },
      tableMaxHeight: 500,
      role: {
        name: '',
        description: ''
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
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
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
        this.update = {}
      } else if (type === 'create') {
        this.show = false
        this.user = {
          name: '',
          description: ''
        }
      }
    },
    search() {
      this.setTable()
    },
    reset() {
      this.query.description = null
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
          CreateRole(this.role).then(res => {
            if (res) {
              this.setTable()
              Message({
                type: 'success',
                message: '新增成功',
                showClose: true
              })
              this.user = {
                name: '',
                description: ''
              }
              this.show = false
            }
          })
        }
      })
    },
    handleUpdate(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return false
        } else {
          UpdateRole(this.update).then(res => {
            if (res) {
              this.setTable()
              Message({
                type: 'success',
                message: '修改成功',
                showClose: true
              })
              this.update = {}
              this.updateShow = false
            }
          })
        }
      })
    },
    handleDelete() {
      if (Object.keys(this.update).length > 0) {
        MessageBox.confirm(`确定删除${this.update.name ? this.update.name : '该'}角色吗？`).then(() => {
          deleteRole(this.update.id).then(res => {
            if (res) {
              Message({
                type: 'success',
                message: '删除成功',
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
      getRoles(this.query).then(res => {
        const { list, total } = res
        this.tableData = list
        this.total = total
        return res
      })
    }
  }
}
</script>
