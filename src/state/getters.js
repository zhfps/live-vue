const getters = {
  Access_Token: state => state.userInfo.Access_Token,
  collapse: state => state.config.collapse,
  tagsList: state => state.config.tagsList,
  rootPath: state => state.config.rootPath,
  pageSizeList: state => state.config.pageSizeList,
  UserInfo: state => state.userInfo.UserInfo
}
export default getters
