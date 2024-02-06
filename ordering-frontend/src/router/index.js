import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "@/components/HomeComponent.vue";
import MemberList from "@/views/MemberList.vue";
import LoginComponent from "@/views/LoginComponent.vue";

const routes = [
  {
    // URL 경로 지정
    path: "/",
    // 이 라우터의 이름
    name: "HOME",
    component: HomeComponent,
  },
  {
    path: "/members",
    name: "MemberList",
    component: MemberList,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginComponent,
  },
];
const router = createRouter({
  // vue-router는 내부적으로 두 가지 방식의 history 관리를 제공한다
  // 1) createWebHistory -> 빈번하게 사용
  // 2) createHashHistory
  history: createWebHistory(),
  routes,
});
export default router;
