/* router */
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";

export const baseUrl = "/pokemon";
const root = document.querySelector("#app");

const routes = [
  { path: baseUrl, component: Home },
  { path: `${baseUrl}/:id`, component: Detail },
];

// 경로에 맞는 컴포넌트를 렌더링하는 함수
const render = (path) => {
  const matchedRoute = routes
    .map((route) => {
      const isMatch = path.match(getPathConvert(route.path));

      return { route, isMatch };
    })
    .find((matchedRoute) => matchedRoute.isMatch !== null);

  // matchedRoute.route.component가 클래스여야 하며, root를 인자로 받는 생성자를 가져야 합니다.
  console.log(
    matchedRoute ? new matchedRoute.route.component(root) : new NotFound(root)
  );
  matchedRoute ? new matchedRoute.route.component(root) : new NotFound(root);
};

// 경로를 정규 표현식으로 변환하는 함수
const getPathConvert = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// 주어진 경로로 이동하는 함수
export const navigateTo = (path) => {
  if (window.location.pathname !== path) {
    // 해당 path render
    window.history.pushState({}, "", window.location.origin + path);
    render(path);
  }
};

// 라우터를 초기화하는 함수
export const initializeRouter = () => {
  // 뒤로가기시 해당 path render
  window.addEventListener("popstate", () => {
    render(window.location.pathname);
  });
  // DOM 구성이 완료되었을 때 document 객체에서 실행.
  window.addEventListener("DOMContentLoaded", () => {
    render(window.location.pathname);
  });
};
