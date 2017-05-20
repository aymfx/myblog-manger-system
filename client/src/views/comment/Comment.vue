<template>
<div>
    <div class="layout-breadcrumb">
        <Breadcrumb>
            <Breadcrumb-item href="#"><router-link to="/" active-class="active" exact>首页</router-link></Breadcrumb-item>
            <Breadcrumb-item href="#"><router-link to="/comment" active-class="active" exact>评论列表</router-link></Breadcrumb-item>       
        </Breadcrumb>
    </div>
    <div id="btns">
            <Input icon="search" placeholder="请输入..." v-model="filter.name" style="width:200px;"></Input>
            <Button type="ghost" @click="getData" class="comment-search">搜索数据</Button>
            <Modal v-model="modal1">
                <p slot="header" style="color:#39f;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>添加评论</span>
                </p>
                <div slot="footer">                  
                </div>
                 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Form-item label="标题" prop="title">
                        <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
                    </Form-item>
     
                    <Form-item label="内容" prop="desc">
                        <markdown-editor v-model="formValidate.desc" ref="markdownEditor" :configs="configs"></markdown-editor>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Form>
            </Modal>
             <Table border :columns="columns" :data="list" @on-selection-change="handleSelectChange"></Table>
             <Page :total="filter.total" :current="filter.page" :page-size="filter.limit" @on-change="changePage" size="small" show-elevator show-sizer class="comment-page"></Page>
             <div class="comment">
                <Button type="info" @click="modal1 =true">添加</Button>
                <Button type="warning" @click="removes">删除</Button>
             </div>
        </div>
</div>
</template>
<script>
   import { markdownEditor } from 'vue-simplemde';
   import Base from '../../common/Base.js';
    export default{
        mixins:[Base],
        data() {
            return {
                 configs: {
                    spellChecker: false // 禁用拼写检查
                 },
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
                model:'comment',
                formValidate: {
                    _id:null,
                    title: '', 
                    desc: ''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    
                    desc: [
                        { required: true, message: '内容不能为空', trigger: 'blur' },
                        { type: 'string', min: 10, message: '内容不能少于10字', trigger: 'blur' }
                    ]
                }
              }
        },
        components: {
            markdownEditor
        }
    }
</script>
<style>
    .comment-page{
        float:left;
        margin-top:30px;
    }
    .comment{
        float:right;
        margin-top:30px;
    }
    #btns{
       overflow:hidden;
    }
    .comment-search{
        margin:20px 0;
    }
</style>