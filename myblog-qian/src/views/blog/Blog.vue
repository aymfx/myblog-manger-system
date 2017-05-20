<template>
<div>
    <div class="layout-breadcrumb">
        <Breadcrumb>
            <Breadcrumb-item href="#"><router-link to="/" active-class="active" exact>首页</router-link></Breadcrumb-item>
            <Breadcrumb-item href="#"><router-link to="/blog" active-class="active" exact>博客列表</router-link></Breadcrumb-item>       
        </Breadcrumb>
    </div>
    <div id="btns">
            <Input icon="search" placeholder="请输入..." v-model="filter.name" style="width:200px;"></Input>
            <Button type="ghost" @click="getData" class="blog-search">搜索数据</Button>
            <Modal v-model="modal1">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>添加数据</span>
                </p>
                <div slot="footer">                  
                </div>
                 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Form-item label="标题" prop="title">
                        <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
                    </Form-item>
     
                    <Form-item label="介绍" prop="desc">
                        <Input v-model="formValidate.desc" type="textarea" placeholder="请输入..."></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Form>
            </Modal>
             <Table border :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
             <Page :total="filter.total" :current="filter.page" :page-size="filter.limit" @on-change="changePage" size="small" show-elevator show-sizer class="blog-page"></Page>
             <div class="blog">
                <Button type="info" @click="modal1 =true">添加</Button>
                <Button type="warning" @click="removes">删除</Button>
             </div>
        </div>
</div>
</template>
<script>
   import Base from '../../common/Base.js';
    export default{
        mixins:[Base],
        data() {
            return {
                 columns: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    
                    {
                        title: '标题',
                        key: 'title'
                    },
                     {
                        title: '内容',
                        key: 'desc'
                    },
                   
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.update(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                model:'blog',
                formValidate: {
                    _id:null,
                    title: '', 
                    desc: ''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 2, message: '介绍不能少于2字', trigger: 'blur' }
                    ]
                }
              }
        }
    }
</script>
<style>
    .blog-page{
        float:left;
        margin-top:30px;
    }
    .blog{
        float:right;
        margin-top:30px;
    }
    #btns{
       overflow:hidden;
    }
    .blog-search{
        margin:20px 0;
    }
</style>