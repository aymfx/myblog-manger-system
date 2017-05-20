<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu  theme="dark" width="auto">
                  
                    <div class="layout-logo-left"></div>
                    <router-link to="/" active-class="active" exact>
                    <Menu-item name="1">
                        <Icon type="home" :size="iconSize"></Icon>
                        <span class="layout-text">首页</span>
                    </Menu-item>
                    </router-link>
                     <router-link :to="{name:'user'}" active-class="active">
                    <Menu-item name="2">
                        <Icon type="person" :size="iconSize"></Icon>
                        <span class="layout-text">用户</span>
                    </Menu-item>
                    </router-link>
                     <router-link :to="{name:'cate'}" active-class="active">
                    <Menu-item name="3">
                        <Icon type="ios-list"" :size="iconSize"></Icon>
                        <span class="layout-text">分类</span>
                    </Menu-item>
                    </router-link>
                     <router-link :to="{name:'blog'}" active-class="active">
                    <Menu-item name="4">
                        <Icon type="document-text" :size="iconSize"></Icon>
                        <span class="layout-text">博客</span>
                    </Menu-item>
                     </router-link>
                       <router-link :to="{name:'comment'}" active-class="active">
                    <Menu-item name="5">
                        <Icon type="ios-chatbubble" :size="iconSize"></Icon>
                        <span class="layout-text">评论</span>
                    </Menu-item>
                     </router-link>
                      <router-link :to="{name:'upload'}" active-class="active">
                    <Menu-item name="5">
                        <Icon type="ios-upload" :size="iconSize"></Icon>
                        <span class="layout-text">上传</span>
                    </Menu-item>
                     </router-link>
                     <router-link :to="{name:'echart'}" active-class="active">
                     <Menu-item name="6">
                        <Icon type="ios-upload" :size="iconSize"></Icon>
                        <span class="layout-text">图表</span>
                    </Menu-item>
                     </router-link>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                </div>
                
                 <router-view></router-view>
               
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
 export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            }
        }
    }
</script>

<style lang="scss">
body,html,.ivu-row-flex,.layout{
  height: 100%
}

 .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height:75%;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    /*  */

    /*  */
.active .ivu-menu-item,{

background: #313540;
}
.active .ivu-menu-item i,.active .ivu-menu-item span{
color: #39f;
}





  
</style>
