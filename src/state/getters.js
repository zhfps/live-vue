const getters = {
  Access_Token: state => state.userInfo.Access_Token,
  collapse: state => state.config.collapse,
  tagsList: state => state.config.tagsList
}
export default getters
