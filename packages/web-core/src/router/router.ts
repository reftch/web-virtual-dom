const ROUTE_PARAMETER_REGEXP = /:(\w+)/g
const URL_FRAGMENT_REGEXP = '([^\\/]+)'

interface RouteState {
  testRegexp: RegExp;
  component: any;
  params: string[];
}

const extractUrlParams = (route: RouteState, windowHash: string) => {
  const params = {}

  if (route.params.length === 0) {
    return params;
  }

  const matches = windowHash.match(route.testRegexp);

  if (matches) {
    matches.shift();
    matches.forEach((paramValue, index) => {
      const paramName = route.params[index]
      params[paramName] = paramValue
    })
  }

  return params;
}

const createRouter = () => {
  const routes: RouteState[] = [];
  let notFound = () => { }

  const router: any = {}

  const checkRoutes = () => {
    const { hash } = window.location

    const currentRoute: any = routes.find((route: any) => {
      const { testRegexp } = route
      return testRegexp.test(hash);
    })

    if (!currentRoute) {
      notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, window.location.hash);
    currentRoute.component(urlParams);
  }

  router.addRoute = (fragment: string, component: any) => {
    const params: string[] = [];

    const parsedFragment = fragment
      .replace(
        ROUTE_PARAMETER_REGEXP,
        (match, paramName) => {
          params.push(paramName)
          return URL_FRAGMENT_REGEXP
        })
      .replace(/\//g, '\\/')

    routes.push({
      testRegexp: new RegExp(`^${parsedFragment}$`),
      component,
      params
    })

    return router;
  }

  router.setNotFound = cb => {
    notFound = cb
    return router;
  }

  router.navigate = (fragment: string) => {
    window.location.hash = fragment;
  }

  router.start = () => {
    window.addEventListener('hashchange', checkRoutes);

    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    checkRoutes();
  }

  return router;
}

export default createRouter;
