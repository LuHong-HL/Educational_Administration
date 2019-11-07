<template>
    <a-sub-menu
      :key="menuInfo.key"
      v-bind="$props"
      v-on="$listeners"
    >
      <span slot="title">
        <span>{{ menuInfo.title }}</span>
      </span>
      <template v-for="item in menuInfo.children">
        <a-menu-item
          v-if="!item.children"
          :key="item.key"
          @click="changeUrl(item.key)"
        >
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu
          v-else
          :key="item.key"
          :menu-info="item"
        />
      </template>
    </a-sub-menu>
  </template>
  <script>
  import { Menu } from 'ant-design-vue';
  export default {
    name: 'SubMenu',
    isSubMenu: true, 
    props: {
      ...Menu.SubMenu.props,
      menuInfo: { 
        type: Object,
        default: ()=>({}),
      },
    },
    methods: {
      changeUrl(url){
       this.$router.push('/home/'+url);
      }
    },
  };
  </script>