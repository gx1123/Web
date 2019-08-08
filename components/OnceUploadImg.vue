<template>
  <div>
    <div
      class="shop_upload"
      style="display: flex"
    >
      <div class="shop_list_img">
        <div
          class="shop_item_img list-item"
          :style="{'height': height,'width': width }"
          v-if="imgUrl"
        >
          <div
            class="shop_item_icon"
          >
            <i
              v-if="!disabled"
              class="el-icon-delete"
              @click="handleRemove"
              style="font-size: 22px;margin-right: 10px"
            ></i>
            <i
              class="el-icon-zoom-in"
              @click="handlePictureCardPreview()"
              style="font-size: 22px"
            ></i>
          </div>
          <img
            :src="imgUrl"
            alt=""
            :style="{'height': height,'width': width }"
          >
        </div>
        <div
          class="shop_list_upload"
          :style="{'height': height,'width': width }"
          @click="handleSelectFile"
          v-show="!imgUrl"
          v-loading="imgLoading"
        >
          <input
            style="display: none"
            id="files"
            multiple="multiple"
            ref="fileInput"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            type="file"
            @change="handleUploadImg"
          >
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogImg.dialogImgVisible">
      <img
        width="100%"
        :src="dialogImg.imageUrl"
        :alt="dialogImg.imageUrl"
      >
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'OnceUploadImg',
    model: {
      prop: 'imgUrl',
      event: 'changeImgUrl'
    },
    props: {
      imgUrl: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '80px'
      },
      height: {
        type: String,
        default: '80px'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        dialogImg: {
          imageUrl: '',
          dialogImgVisible: false
        },
        imgLoading: false
      }
    },
    methods: {
      // 选择图片
      handleSelectFile () {
        this.$refs.fileInput.dispatchEvent(new MouseEvent('click'))
      },
      // 放大图片
      handlePictureCardPreview () {
        this.dialogImg.imageUrl = this.imgUrl
        this.dialogImg.dialogImgVisible = true
      },
      // 删除图片时
      handleRemove () {
        this.$emit('changeImgUrl', '')
      },
      // 自定义的上传图片
      async handleUploadImg (e) {
        this.imgLoading = true
        let file = e.target.files[0]
        let fd = new FormData()
        fd.append('file', file)
        let res = await this.$service.upload.uploadFile(fd)
        this.$emit('changeImgUrl', res.data.result.pic_cover)
        this.imgLoading = false
      }
    }
  }
</script>

<style scoped>
  .shop_list_img{
    display: flex;
    align-items: center;
  }
  .shop_item_img{
    border: 1px solid  #ccc;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
  }
  .shop_item_img:hover .shop_item_icon{
    opacity: 1;
  }
  .shop_item_icon{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .shop_list_upload{
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed   #ccc;
  }
  .shop_list_upload:hover{
    border-color: #1f7bfe;
  }
  .list-item {
    display: inline-block;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
