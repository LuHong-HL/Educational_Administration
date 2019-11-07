<template>
  <div class="header">
    <div class="info">
      <p class="name"><span>name</span> | <a>注销</a></p>
      <ul>
        <li>
          <a-badge dot>
            <span class="iconfont" title="公告">&#xe600;</span>
          </a-badge>
        </li>
        <li>
          <a-badge :count="2">
            <span class="iconfont " title="消息">&#xe617;</span>
          </a-badge>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style scoped>
  .header {
    width: 85%;
    height: 59px;
    background: #fff;
    position: fixed;
    right: 0;
    top: 0;
    box-shadow:0px 10px 10px rgba(0, 0, 0, 0.06);
  }

  .info ul li {
    float: right;
    width: 5%;
    height: 50px;
    line-height: 50px;
  }

  .name {
    float: right;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    margin-right: 10%;
  }

  .name span {
    margin-right: 5px;
  }

  .name a {
    margin-left: 5px;
  }

  .iconfont {
    font-size: 20px;
    color: #888;
  }

  .iconfont:hover {
    cursor: pointer;
    color: rgb(29, 33, 37);
  }

</style>
