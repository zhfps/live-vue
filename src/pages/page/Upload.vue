<template>
  <div class="cropper-component">
    <div class="info-item">
      <div class="btn-box">
        <label class="btn" for="uploads">选择图片</label>
        <input
          id="uploads"
          type="file"
          :value="imgFile"
          style="position:absolute; clip:rect(0 0 0 0);width: 1px;"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadImg($event, 1)"
        >

        <input type="button" class="operation-btn" value="+" title="放大" @click="changeScale(1)">
        <input type="button" class="operation-btn" value="-" title="缩小" @click="changeScale(-1)">
        <input type="button" class="operation-btn" value="↺" title="左旋转" @click="rotateLeft">
        <input type="button" class="operation-btn" value="↻" title="右旋转" @click="rotateRight">
        <input type="button" class="operation-btn" value="↓" title="下载" @click="down('blob')">
        <div class="btn" @click="finish('blob')">上传头像</div>
      </div>
      <div class="operation-box">
        <div class="cropper">
          <vue-cropper
            ref="cropper"
            :img="option.img"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="option.info"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :fixed-box="option.fixedBox"
            @realTime="realTime"
          />
        </div>
      </div>
      <div class="preview-box">
        <div :style="previews.div" class="preview">
          <img :src="previews.url" :style="previews.img">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
import { fileUpload } from '@/api/module/file'
export default {
  name: 'Cropper',
  components: {
    VueCropper
  },
  data() {
    return {
      // 剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: true, // 输出原图比例截图 props名full
        outputType: 'png', // 裁剪生成额图片的格式
        canMove: true, // 能否拖动图片
        original: false, // 上传图片是否显示原始宽高
        canMoveBox: true, // 能否拖动截图框
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixedBox: false // 截图框固定大小
      },
      fileName: '', // 本机文件地址
      downImg: '#',
      imgFile: '',
      uploadImgRelaPath: '' // 上传后的图片的地址
    }
  },
  methods: {
    // 放大/缩小
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 坐旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    // 右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 上传图片（点击上传按钮）
    finish(type) {
      console.log('finish', type)
      const _this = this
      const formData = new FormData()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          // const img = window.URL.createObjectURL(data)
          formData.append('fileName', data, _this.fileName)
          fileUpload('avater', formData).then(res =>
            console.log(res)
          )
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          // this.model = true;
          // this.modelSrc = data;
        })
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data
    },
    // 下载图片
    down(type) {
      var aLink = document.createElement('a')
      aLink.download = 'author-img'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    },
    // 选择本地图片
    uploadImg(e, num) {
      var _this = this
      // 上传图片
      var file = e.target.files[0]
      _this.fileName = file.name
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          _this.option.img = data
        } else if (num === 2) {
          _this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    }
  }
}
</script>
<style lang="scss">
  .cropper-component {
    width: 500px;
    margin: 0 auto;
    position: relative;
    .btn-box {
      margin: 20px 0;
      .btn {
        padding: 4px 12px;
        text-align: center;
        border-radius: 4px;
        background-color: #387EF6;
        color: #fff;
        cursor: pointer;
        display: inline-block;
      }
      .operation-btn {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #eaeaea;
        cursor: pointer;
        display: inline-block;
        font-size: 20px;
        color: #333;
        padding: 0;
        margin: 0 10px;
      }
    }
    .info-item {
      .operation-box {
        display: inline-block;
        .cropper {
          width: 260px;
          height: 260px;
        }
      }
      .preview-box {
        top: 60px;
        right: 10px;
        .preview {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border: 1px solid #ccc;
          background-color: #ccc;
          margin: 5px;
          overflow: hidden;
        }
      }
    }
  }
</style>
