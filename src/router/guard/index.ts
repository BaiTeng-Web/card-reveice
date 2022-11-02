import type { Router } from 'vue-router';

/*
  Permission
*/
function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, _, next) => next());
}

export default function setupRouterGuard(router: Router):void {
  createPermissionGuard(router);
}
