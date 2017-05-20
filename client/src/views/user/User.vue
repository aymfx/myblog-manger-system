<template>
    <div class="user">
        <Table border :columns="columns" :data="list" class="table" @on-selection-change="handleSelectChange"></Table>
        <Page :total="filter.total" size="small" :current="filter.page" :page-size="filter.limit" @on-change="changePage" show-elevator show-sizer class="page"></Page>
        <div class="add">
            <Button type="primary" @click="add=true">添加</Button>
            <Button type="warning" @click="removes">全部删除</Button> 
            <Modal v-model="add">
                <p slot="header" style="color:#39f;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>添加用户</span>
                </p>
                <div slot="footer"></div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Form-item label="用户名" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                    </Form-item>
                    <Form-item label="密码" prop="name">
                        <Input v-model="formValidate.pwd" placeholder="请输入密码"></Input>
                    </Form-item>
                    <Form-item label="邮箱" prop="mail">
                        <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
                    </Form-item>
                    <Form-item label="城市" prop="city">
                        <Select v-model="formValidate.city" placeholder="请选择所在地">
                            <Option value="beijing">北京市</Option>
                            <Option value="shanghai">上海市</Option>
                            <Option value="shenzhen">深圳市</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="选择日期">
                        <Row>
                            <Col span="11">
                                <Form-item prop="date">
                                    <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
                                </Form-item>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <Form-item prop="time">
                                    <Time-picker type="time" placeholder="选择时间" v-model="formValidate.time"></Time-picker>
                                </Form-item>
                            </Col>
                        </Row>
                    </Form-item>
                    <Form-item label="性别" prop="gender">
                        <Radio-group v-model="formValidate.gender">
                            <Radio label="male">男</Radio>
                            <Radio label="female">女</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="爱好" prop="interest">
                        <Checkbox-group v-model="formValidate.interest">
                            <Checkbox label="吃饭"></Checkbox>
                            <Checkbox label="睡觉"></Checkbox>
                            <Checkbox label="跑步"></Checkbox>
                            <Checkbox label="看电影"></Checkbox>
                        </Checkbox-group>
                    </Form-item>
                    <Form-item label="介绍" prop="desc">
                        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Form>
            </Modal>
        </div>
    </div>
</template>
<script>
    var CryptoJs=require('crypto-js');
    export default{
        data () {
            return {
                add:false,
                formValidate: {
                    _id:null,
                    name: '',
                    pwd:'',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                },
                list:[],
                self:this,
                ids:[],
                filter:{
                    limit:8,
                    page:1,
                    name:'',
                    tatal:0
                },
                columns: [
                    {
                        type: 'selection', 
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    },
                    {
                        title: '城市',
                        key: 'city'
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
                                            this.add=true;
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
                ]  
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    // 如果有this.formValidate._id就意味着我们执行的是更新的操作
                    // 否则没有的话，我们执行的就是添加操作
                    if (valid) {
                    
                        var _this = this;
                        var subUrl = '';
                        var method = '';

                        if(_this.formValidate._id !=null){
                            subUrl = 'http://localhost:3000/users/data/' + _this.formValidate._id;
                            method = 'PUT';
                        }else{
                            subUrl = 'http://localhost:3000/users/data/';
                            method = 'POST';
                        }
                         _this.formValidate.pwd = CryptoJs.MD5(_this.formValidate.pwd,{assign:true}).toString();
                        this.$http({
                            method: method,
                            url:subUrl,
                            data: _this.formValidate
                        }).then(function(res){
                            _this.add = false;
                            _this.$Message.success('提交成功');
                            console.log(_this.$data.formValidate);
                            console.log(_this.$options.data().formValidate);
                            Object.assign(_this.$data.formValidate,_this.$options.data().formValidate)
                            _this.getData();
                        })
                       
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            changePage(page){
                console.log(page,"hhhhhhhhhhhhhhhhhhhhhhhh");
                this.filter.page = page;
                this.getData();
            },
            handleSelectChange(select){
                var _this = this;
                if(select.length>0){
                    var ids = [];
                    let selectLen = select.length;
                    for(var i=0;i<selectLen;i++){
                        ids.push(select[i]._id);
                    }
                    _this.ids = ids;
                }
            },
            getData(){
                var _this = this;
                this.$http.post('http://localhost:3000/users/list',_this.filter)
                .then(function(result){
                    if('docs' in result.data){
                        
                        _this.list = result.data.docs;
                        console.log(_this.list,'空间上班福建省的年份',result);
                        _this.filter.total = result.data.total;
                    }
                })
                .catch(function(error){
                    console.log(error)
                })
            },
            remove(index){
                var _this = this;
                var id = _this.list[index]._id;
                _this.$Modal.confirm({
                    title:"警告",
                    content:"确认删除？",
                    onOk: ()=>{
                        _this.$http.delete('http://localhost:3000/users/'+id).then(function(res){
                            _this.getData();
                            _this.$Message.info('删除成功');
                        }) 
                    },
                    onCancel:()=>{
                        _this.$Message.info('取消删除');
                    }
                })
            },
            removes(){
                var _this = this;
                if(_this.ids.length>0){
                   _this.$Modal.confirm({
                       title:"警告",
                       content:"确认删除？",
                       onOk: ()=>{
                           console.log(_this.ids,250);
                           _this.$http.post('http://localhost:3000/users/removes',{ids:_this.ids}).then(function(res){
                               _this.getData();
                               _this.$Message.info('删除成功');
                           })    
                       },
                       onCancel:()=>{
                           _this.$Message.info('取消删除');
                       }
                   })
                }
            },
            update(index){
                console.log('我被点击')
                var _this = this;
                _this.modal1 = true;
                var dataObj = Object.assign({},_this.list[index]);
                _this.formValidate = dataObj;
            }
        },
        created(){
            this.getData();
        }
    }
</script>
<style scoped>
    .table{
        margin-bottom:30px;
    }
    .page{
        float:left;
    }
    .add{
        float:right;
    }
    .ivu-modal-footer{
        padding:0;
    }
</style>