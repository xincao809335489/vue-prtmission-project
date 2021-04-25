import Vue from 'vue'
import {
  Container,
  Card,
  Row,
  Col,
  RadioGroup,
  RadioButton,
  Form,
  Input,
  FormItem,
  Radio,
  Button,
  Message,
  Select,
  Option,
  Image,
  Header,
  Aside,
  Main,
  Avatar,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Scrollbar,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Container).use(Card).use(Row).use(Col).use(RadioButton).use(RadioGroup).use(Form).use(FormItem).use(Input).use(Radio).use(Button).use(Select).use(Option).use(Image).use(Header).use(Aside).use(Main).use(Avatar).use(Menu).use(Submenu).use(MenuItemGroup).use(MenuItem).use(Scrollbar).use(Breadcrumb).use(BreadcrumbItem)
Vue.prototype.$message = Message
