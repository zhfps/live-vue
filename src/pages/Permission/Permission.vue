<template>
  <div class="Permission">
    <el-card v-show="searchShow" class="tool-card">
      <el-form class="search" label-width="80px" :inline="true" :model="query">
        <el-form-item size="mini" label="模块名称">
          <el-input v-model="query.name" placeholder="模块名称" @change="search" />
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
            prop="name"
            label="权限名称"
            width="180"
          />

          <el-table-column
            prop="sort"
            label="排序"
            width="180"
          />
          <el-table-column
            prop="permission"
            label="权限标识"
            width="300"
          />
          <el-table-column
            prop="href"
            label="路径"
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
      <el-form ref="menuForm" label-width="80px" :rules="rules" :model="permission" style="padding-right: 15px;">
        <el-form-item size="mini" label="父节点">
          <el-cascader
            v-model="permission.parentId"
            style="width: 100%;"
            :options="options"
            :props="{ checkStrictly: true, emitPath: false}"
            clearable
          />
        </el-form-item>
        <el-form-item prop="name" size="mini" label="权限名称">
          <el-input v-model="permission.name" placeholder="权限名称" />
        </el-form-item>
        <el-form-item size="mini" label="路径">
          <el-input v-model="permission.href" placeholder="路径" />
        </el-form-item>
        <el-form-item prop="permission" size="mini" label="权限标识">
          <el-input v-model="permission.permission" placeholder="权限标识" />
        </el-form-item>
        <el-form-item size="mini" label="序号">
          <el-input v-model="permission.sort" placeholder="序号" />
        </el-form-item>
        <el-form-item size="mini" label="类型">
          <el-select v-model="permission.type" size="mini" style="width: 100%;" placeholder="类型">
            <el-option label="页面" value="1" />
            <el-option label="其它" value="2" />
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
        <el-form-item prop="name" size="mini" label="权限名称">
          <el-input v-model="update.name" placeholder="权限名称" />
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
import './_Permission.scss'
import '@/assets/styles/public.scss'
import { getPermissions, permissionsSelect, createPermissions, updatePermission, deletePermissions } from '@/api/module/common'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'Permission',
  data() {
    return {
      query: {
        name: ''
      },
      permission: {
        id: '',
        parentId: 0,
        href: '',
        name: '',
        permission: '',
        type: null
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
        ],
        permission: [
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
        this.update = {}
      } else if (type === 'create') {
        this.show = false
        this.permission = {
          id: 0,
          parentId: 0,
          href: '',
          name: '',
          permission: '',
          type: 0
        }
      }
    },
    search() {
      this.setTable()
    },
    reset() {
      this.query = {
        name: ''
      }
      this.setTable()
    },
    handleRefresh() {
      this.setTable()
    },
    handleCurrentChange(val) {
      if (val != null) {
        this.update = (({ id,
          name }) => ({ id,
          name }))(val)
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
          createPermissions(this.permission).then(res => {
            if (res) {
              this.setTable()
              Message({
                type: 'success',
                message: '新增成功',
                showClose: true
              })
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
          updatePermission(this.update).then(res => {
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
        MessageBox.confirm(`确定删除${this.update.title ? this.update.title : '该'}菜单吗？`).then(() => {
          deletePermissions(this.update.id).then(res => {
            if (res) {
              Message({
                type: 'success',
                message: '删除成功',
                showClose: true
              })
              this.update = {}
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
      getPermissions(this.query).then(res => {
        this.tableData = res
      })
    },
    setSelect() {
      permissionsSelect(1).then(res => {
        this.options = res
      })
    }
  }
}
</script>
