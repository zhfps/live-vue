import state from '@/state'
import { getCache } from '@/plugin/cache'
export function getPermission(name) {
  const permissions = state.getters.Permissions ? state.getters.Permissions : getCache('permissions', 'object')
  if (permissions instanceof Array) {
    const index = permissions.findIndex(x => x.authority === name)
    if (index > -1) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
