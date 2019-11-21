import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import myjs from '@/myJS'
import cookie from 'js-cookie';
import axios from 'axios'
import '@/assets/theme/index.css'

Vue.prototype.$cookie = cookie;
/*element*/
import {
  Container,
  Header,
  TabPane,
  TableColumn,
  Aside,
  MenuItem,
  Main,
  Submenu,
  Option,
  Step,
  Row,
  Col,
  Button,
  Radio,
  Checkbox,
  Input,
  Select,
  Cascader,
  DatePicker,
  TimePicker,
  Upload,
  Form,
  Table,
  Tag,
  Progress,
  Pagination,
  Message,
  Menu,
  Tabs,
  Steps,
  Dialog,
  Tooltip,
  Popover,
  Card,
  Carousel,
  FormItem,
  MessageBox,
  Tree,
  Breadcrumb,
  BreadcrumbItem,
  RadioGroup,
  CheckboxGroup,
  Autocomplete,
} from 'element-ui';
Vue.use(Container)
  .use(Header)
  .use(TabPane)
  .use(TableColumn)
  .use(Aside)
  .use(MenuItem)
  .use(Main)
  .use(Submenu)
  .use(Option)
  .use(Step)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(Radio)
  .use(Checkbox)
  .use(Input)
  .use(Select)
  .use(Cascader)
  .use(DatePicker)
  .use(TimePicker)
  .use(Upload)
  .use(Form)
  .use(Table)
  .use(Tag)
  .use(Progress)
  .use(Pagination)
  .use(Menu)
  .use(Tabs)
  .use(Steps)
  .use(Dialog)
  .use(Tooltip)
  .use(Popover)
  .use(Card)
  .use(Carousel)
  .use(FormItem)
  .use(Tree)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(CheckboxGroup)
  .use(RadioGroup)
  .use(Autocomplete)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$msgbox = MessageBox;

import api from './api/api';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.myjs = myjs;

// router.beforeEach((to, from, next) => {
//   if (to.fullPath == '/getByOrgAndCompanyId' || to.fullPath == '/Login') {
//     if (localStorage.key_token && cookie.get('token')) {
//       localStorage.removeItem('TagsView');
//       next({
//         path: '/index'
//       });
//     } else {
//       next();
//     }
//   } else {
//     if (!localStorage.key_token || !cookie.get('token')) {
//       next({
//         path: '/getByOrgAndCompanyId'
//       });
//     } else {
//       next();
//     }
//   }
//   next();
// })

new Vue({
  el: '#app',
  router,
  store,
  api,
  render: h => h(App),
}).$mount('#app')